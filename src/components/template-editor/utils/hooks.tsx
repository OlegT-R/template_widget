import { useState } from 'react';

import { getFirstTextArea } from '.';
import {
  IIfElse,
  ITemplate,
  ITextArea,
  NodeType
} from '../../../models/template-model/entities';

import { getEmptyIfElse, getEmptyTextArea } from '.';

interface IDeleteNode {
  node: IIfElse;
  parentNode: NodeType;
}

export type DeleteNodeType = (param: IDeleteNode) => void;

export const useDeleteBlock = (initTemplate: ITemplate) => {
  const [template, setTemplate] = useState(initTemplate);

  return {
    onDelete: ({ node, parentNode }: IDeleteNode) => {
      const removeIndex = parentNode.indexOf(node);
      if (removeIndex !== -1) {
        const nextBlock = parentNode[removeIndex + 1];

        // next and prev block of IfElse should been textarea
        const nextValue = (nextBlock as ITextArea).value;
        parentNode.splice(removeIndex + 1, 1);

        // update prev textarea
        const prevBlock = parentNode[removeIndex - 1];
        (prevBlock as ITextArea).value += nextValue;

        // remove ifElseBlock, transform parentNode, should update all template
        parentNode.splice(removeIndex, 1);
      }
      setTemplate({ ...template });
    },
    block: template.block,
    updateTemplate: () => {
      setTemplate({ ...template });
    }
  };
};

interface IActiveTextArea {
  node: ITextArea;
  parent: NodeType;
  position: number;
  value: string;
}

export type SetActiveTextAreaType = (params: IActiveTextArea) => void;

export const useActiveTextArea = (initBlock: NodeType) => {
  const { node: firstNode, parent: firstParent } = getFirstTextArea(initBlock);
  const { length } = firstNode.value;
  const [activeTextArea, setTextAreaPosition] = useState({
    node: firstNode,
    parent: firstParent,
    position: length,
    value: firstNode.value,
  });
  return {
    onSetActiveTextArea: ({
      node,
      parent,
      position,
      value,
    }: IActiveTextArea) => {
      // update value in block to current
      node.value = value;
      setTextAreaPosition({ node, position, parent, value });
    },
    activeTextArea,
    setTextAreaPosition,
  };
};

export const useAddIfElse = (
  activeTextArea: IActiveTextArea,
  updateTemplate: () => void,
  setTextAreaPosition: (params: IActiveTextArea) => void
) => () => {
  const { node, position, parent } = activeTextArea;

  // adding ifelse to parent node, split selected textarea to 2 textarea;
  const currentIndex = parent.indexOf(node);
  if (currentIndex !== -1) {
    const startValue = node.value.substr(0, position);
    const endValue = node.value.substr(position, node.value.length);
    const newTextArea = getEmptyTextArea(endValue);
    const newIfElse = getEmptyIfElse();

    // update parent block
    node.value = startValue;
    parent.splice(currentIndex + 1, 0, newIfElse);
    parent.splice(currentIndex + 2, 0, newTextArea);
  }

  // update selected textarea,
  setTextAreaPosition({
    node,
    parent,
    position: node.value.length,
    value: node.value,
  });
  updateTemplate();
};

export const useAddVariable = (
  updateTemplate: () => void,
  activeTextArea: IActiveTextArea,
  setTextAreaPosition: (params: IActiveTextArea) => void
) => (varName: string) => {
  const { node, position } = activeTextArea;
  const startValue = node.value.substr(0, position);
  const endValue = node.value.substr(position, node.value.length);
  node.value = `${startValue}{${varName}}${endValue}`;
  // update postion to end of variable
  activeTextArea.position += varName.length + 2;
  setTextAreaPosition(activeTextArea);
  updateTemplate();
};
