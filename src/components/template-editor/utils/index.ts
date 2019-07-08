import uuid from 'uuid';

import {
  IIfElse,
  isTextArea,
  ITemplate,
  ITextArea,
  NodeType
} from '../../../models/template-model/entities';

export const getEmptyTextArea = (
  value: string = '',
  id: string = uuid()
): ITextArea => ({
  id,
  value,
});

export const getEmptyIfElse = (): IIfElse => ({
  id: uuid(),
  if: [getEmptyTextArea()],
  then: [getEmptyTextArea()],
  else: [getEmptyTextArea()],
});

export interface ITextAreaWithParent {
  node: ITextArea;
  parent: NodeType;
}

export const getFirstTextArea = (block: NodeType): ITextAreaWithParent => {
  const recursive = (nextBlock: NodeType): ITextAreaWithParent => {
    const firstItem = nextBlock[0];
    if (isTextArea(firstItem)) {
      return {
        node: firstItem,
        parent: nextBlock,
      };
    }

    // in first place should been only textarea
    return recursive(firstItem.if);
  };

  return recursive(block);
};

export const defaultToEmptyTemplate = (template?: ITemplate): ITemplate =>
  template ? template : { block: [getEmptyTextArea()] };
