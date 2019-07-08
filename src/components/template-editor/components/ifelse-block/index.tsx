import React from 'react';

import { Icon } from 'antd';
import { IIfElse, NodeType } from '../../../../models/template-model/entities';

import { DeleteNodeType, SetActiveTextAreaType } from '../../utils/hooks';
import { getTemplateNode } from '../template-node-switcher';

import { Operator } from '../ifelse-btn/elements';

import {
  Block,
  BlockLine,
  ContentCell,
  OperatorCell,
  StyledBtn
} from './elements';

interface IIfElseBlockProps {
  onDelete: DeleteNodeType;
  node: IIfElse;
  parentNode: NodeType;
  onSetActiveTextArea: SetActiveTextAreaType;
}

export const IfElseBLock: React.FC<IIfElseBlockProps> = ({
  node,
  onDelete,
  parentNode,
  onSetActiveTextArea,
}) => (
  <Block>
    <BlockLine>
      <OperatorCell>
        <Operator>If</Operator>
        <StyledBtn
          type='danger'
          size='small'
          onClick={() => onDelete({ node, parentNode})}
        >
          delete
          <Icon type='delete' />
        </StyledBtn>
      </OperatorCell>
      <ContentCell>
        {getTemplateNode(node.if, onDelete, onSetActiveTextArea)}
      </ContentCell>
    </BlockLine>
    <BlockLine>
      <OperatorCell>
        <Operator>Then</Operator>
      </OperatorCell>
      <ContentCell>
        {getTemplateNode(node.then, onDelete, onSetActiveTextArea)}
      </ContentCell>
    </BlockLine>
    <BlockLine>
      <OperatorCell>
        <Operator>Else</Operator>
      </OperatorCell>
      <ContentCell>
        {getTemplateNode(node.else, onDelete, onSetActiveTextArea)}
      </ContentCell>
    </BlockLine>
  </Block>
);
