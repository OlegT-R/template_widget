import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { VariableNameBtns } from '.';
import { VarBtn } from './elements';

const variables = ['var1', 'var2', 'var3'];

test('<VariableNameBtns />', () => {
  const component = shallow(
    <VariableNameBtns arrVarNames={variables} onBtnClick={() => null} />
  );
  expect(component.find(VarBtn).length).toBe(3);
  expect(toJson(component)).toMatchSnapshot();
});
