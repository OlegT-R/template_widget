import { ITemplate, NodeItem } from '../../models/template-model/entities';

import {
  isTextArea,
  IVariables,
  NodeType
} from '../../models/template-model/entities';

export const replaceVar = (strWithVar: string, values: IVariables): string => {
  const match = strWithVar.match(/\{(\w+)\}/gi);
  let replacedStr = strWithVar;
  if (match) {
    for (const name of match) {
      const clearName = name.slice(1, name.length - 1);
      const replacer = values[clearName] || '';
      replacedStr = replacedStr.split(name).join(replacer);
    }
  }
  return replacedStr;
};

export const getMessageFromTemplate = (
  variables: IVariables,
  template: ITemplate
): string => {
  const recursive = (node: NodeType): string => {
    let message = '';
    if (typeof node !== 'object') {
      return '';
    }
    node.map((nodeItem: NodeItem) => {
      if (isTextArea(nodeItem)) {
        message += replaceVar(nodeItem.value, variables);
      } else {
        const ifResult = recursive(nodeItem.if);
        if (ifResult !== '') {
          message += recursive(nodeItem.then);
        } else {
          message += recursive(nodeItem.else);
        }
      }
      return message;
    });
    return message;
  };

  return recursive(template.block);
};
