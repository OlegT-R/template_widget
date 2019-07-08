import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { NodeType } from '../../../../models/template-model/entities';
import { IfElseBLock } from '../ifelse-block';
import { TextArea } from '../text-area';

import { getTemplateNode } from '.';

const onDeleteNode = () => null;
const onSetActiveTextArea = () => null;
describe('<MyComponent />', () => {
  it('should render <TextArea />', () => {
    const textAreaNode = {
      id: 'testTextArea',
      value: 'TextArea',
    };

    const wrapper = shallow(
      <div>
        {getTemplateNode([textAreaNode], onDeleteNode, onSetActiveTextArea)}
      </div>
    );
    expect(wrapper.find(TextArea).length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render <IfElseBLock />', () => {
    const node: NodeType = [
      {
        id: 'id',
        if: [
          {
            id: 'testifElseIF',
            value: 'testifElseIF',
          },
        ],
        then: [
          {
            id: 'testifElseTHEN',
            value: 'testifElseTHEN',
          },
        ],
        else: [
          {
            id: 'testifElseELSE',
            value: 'testifElseELSE',
          },
        ],
      },
    ];

    const wrapper = shallow(
      <div>{getTemplateNode(node, onDeleteNode, onSetActiveTextArea)}</div>
    );
    expect(wrapper.find(IfElseBLock).length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
