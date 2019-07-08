import { ITextArea } from './textarea';

export interface IIfElse {
  id: string,
  if: NodeType;
  then: NodeType;
  else: NodeType;
}

export type NodeType = Array<ITextArea | IIfElse>;
