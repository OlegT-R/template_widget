import React from 'react';

import {
  isTextArea,
  NodeItem,
  NodeType
} from '../../../../models/template-model/entities';

import { DeleteNodeType, SetActiveTextAreaType } from '../../utils/hooks';
import { IfElseBLock } from '../ifelse-block';
import { TextArea } from '../text-area';

export const getTemplateNode = (
  node: NodeType,
  onDeleteNode: DeleteNodeType,
  onSetActiveTextArea: SetActiveTextAreaType
): React.ReactNode => {
  return node.map((nodeItem: NodeItem) => {
    if (isTextArea(nodeItem)) {
      return (
        <TextArea
          key={nodeItem.id}
          node={nodeItem}
          onSetActiveTextArea={onSetActiveTextArea}
          parentNode={node}
        />
      );
    }
    return (
      <IfElseBLock
        key={nodeItem.id}
        parentNode={node}
        node={nodeItem}
        onDelete={onDeleteNode}
        onSetActiveTextArea={onSetActiveTextArea}
      />
    );
  });
};
