import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { TemplateEditor } from '.';
import { ITemplate } from '../../models/template-model/entities';

const initTemplate: ITemplate = {
  block: [
    {
      id: 'Block1Start',
      value: 'Block1Start',
    },
    {
      id: 'IfElse1',
      if: [
        {
          id: 'Block2If',
          value: 'Block2If',
        },
      ],
      then: [
        {
          id: 'BLock3Start',
          value: 'BLock3Start',
        },
        {
          id: 'IfElse2',
          if: [
            {
              id: 'BLock4If',
              value: 'BLock4If',
            },
          ],
          then: [
            {
              id: 'BLock4Then',
              value: 'BLock4Then',
            },
          ],
          else: [
            {
              id: 'BLock4Else',
              value: 'BLock4Else',
            },
          ],
        },
        {
          id: 'BLock3End',
          value: 'BLock3End',
        },
      ],
      else: [
        {
          id: 'Block2Else',
          value: 'Block2Else',
        },
      ],
    },
    {
      id: 'Block1End',
      value: 'Block1End',
    },
  ],
};

const variables = ['var1', 'var2', 'var3'];

describe('<TemplateEditor />', () => {
  test('Test Click Variable', () => {
    const saveTemplate = jest.fn();
    const component: any = mount(
      <TemplateEditor
        template={initTemplate}
        arrVarNames={variables}
        callbackSave={saveTemplate}
        showPreview={() => null}
      />
    );
    const btns = component.find('button.ant-btn-primary');
    expect(btns.length).toBe(4);
    const btnVar1 = btns.first();
    btnVar1.simulate('click');
    component.update();
    const area = component.find('textarea').first();
    const { value } = area.props();
    expect(value).toBe('Block1Start{var1}');
    expect(toJson(area)).toMatchSnapshot();
  });

  test('Test Remove 1-st level if else block', () => {
    const saveTemplate = jest.fn();
    const component: any = mount(
      <TemplateEditor
        template={initTemplate}
        arrVarNames={variables}
        callbackSave={saveTemplate}
        showPreview={() => null}
      />
    );
    const btns = component.find('button.ant-btn-danger');
    expect(btns.length).toBe(2);
    const btnDel1 = btns.first();
    btnDel1.simulate('click');
    const areas = component.find('textarea');
    expect(areas.length).toBe(1);
  });

  test('Test Adding if else block', () => {
    const saveTemplate = jest.fn();
    const component: any = mount(
      <TemplateEditor
        template={initTemplate}
        arrVarNames={variables}
        callbackSave={saveTemplate}
        showPreview={() => null}
      />
    );
    const areas = component.find('textarea');
    expect(areas.length).toBe(9);

    const canSplitArea = areas.at(1);
    canSplitArea.simulate('blur');
    component.update();
    const btnAdd = component.find('button.ant-btn-dashed');
    btnAdd.simulate('click');
    component.update();
    const newAreas = component.find('textarea');
    expect(newAreas.length).toBe(9 + 4);
  });

  test('Test call callback', () => {
    const saveTemplate = jest.fn();
    const component: any = mount(
      <TemplateEditor
        template={initTemplate}
        arrVarNames={variables}
        callbackSave={saveTemplate}
        showPreview={() => null}
      />
    );
    const btns = component.find('button.ant-btn-primary');
    btns.last().simulate('click');
    expect(saveTemplate).toBeCalled();
  });
});
