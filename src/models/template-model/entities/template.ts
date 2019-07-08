import { IIfElse, NodeType } from './node';
import { ITextArea } from './textarea';

export interface ITemplate {
  block: NodeType;
}

export type NodeItem = ITextArea | IIfElse;

export function isTextArea(node: NodeItem): node is ITextArea {
  return (node as ITextArea).value !== undefined;
}

export function isIfElse(node: NodeItem): node is IIfElse {
  return (node as IIfElse).if !== undefined;
}
