import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { TemplatePreview } from '.';
import { ITemplate } from '../../models/template-model/entities';

const variables = ['var1', 'var2', 'var12'];

const template: ITemplate = {
  block: [
    {
      id: 'Block1Start',
      value: 'Var1{var1}',
    },
    {
      id: 'IfElse1',
      if: [
        {
          id: 'Block2If',
          value: '{var2}',
        },
      ],
      then: [
        {
          id: 'block2',
          value: 'then{var2}',
        },
      ],
      else: [
        {
          id: 'Block2Else',
          value: 'else2',
        },
      ],
    },
    {
      id: 'Block1End',
      value: 'Var12{var12}',
    },
  ],
};

describe('<TemplatePreview />', () => {
  test('Component structure: Should contain textarea and 3 inputs', () => {
    const component: any = mount(
      <TemplatePreview template={template} arrVarNames={variables} />
    );
    // check existing 1 textarea
    const textarea = component.find('textarea');
    expect(textarea.length).toBe(1);

    // check existing 3 input -> 3 vars
    const inputs = component.find('input');
    expect(inputs.length).toBe(3);
    const inputGroup = component.find('ant-input-group');

    // check inputs to expecting var names
    inputGroup.map((group: any, index: number) => {
      const inputLabel = group.find('.ant-input-group-addon').text();
      expect(inputLabel).toEqual(variables[index]);
    });
    expect(toJson(component)).toMatchSnapshot();
  });

  test('Should update message after type', () => {
    const component: any = mount(
      <TemplatePreview template={template} arrVarNames={variables} />
    );
    const { value } = component.find('textarea').props();
    expect(value).toEqual('Var1else2Var12');

    // set var2 variable to UPDATE, expecting then thread
    const input = component
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'UPDATE' } });
    component.update();
    const { value: updatedValue } = component.find('textarea').props();
    expect(updatedValue).toEqual('Var1thenUPDATEVar12');
  });
});
