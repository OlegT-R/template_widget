import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { VariableInputs } from '.';

const onChangeVariable = () => null;
const arrVarNames = ['var1', 'var2'];

test('<VariableInputs />', () => {
  const component: any = shallow(
    <VariableInputs
      onChangeVariable={onChangeVariable}
      arrVarNames={arrVarNames}
    />
  );
  expect(toJson(component)).toMatchSnapshot();
});
