import React, { Component } from 'react';

import { Input } from 'antd';
import {
  ITextArea,
  NodeType
} from '../../../../models/template-model/entities';
import { SetActiveTextAreaType } from '../../utils/hooks';

const { TextArea: Area } = Input;

interface ITextAreaProps {
  node: ITextArea;
  parentNode: NodeType;
  onSetActiveTextArea: SetActiveTextAreaType;
}

interface IState {
  value: string;
  propsValue: string;
}

export class TextArea extends Component<ITextAreaProps, IState> {
  public static getDerivedStateFromProps(props: ITextAreaProps, state: IState) {
    if (props.node.value !== state.propsValue) {
      return {
        value: props.node.value,
        propsValue: props.node.value,
      };
    }

    return null;
  }

  public state = {
    value: '',
    propsValue: '',
  };

  public render() {
    const { node, onSetActiveTextArea, parentNode } = this.props;
    const { value } = this.state;
    return (
      <Area
        value={value}
        autosize={{ minRows: 2 }}
        onChange={e => {
          this.setState({ value: e.target.value });
        }}
        onBlur={e =>
          onSetActiveTextArea({
            node,
            parent: parentNode,
            position: e.target.selectionEnd,
            value: e.target.value,
          })
        }
      />
    );
  }
}
