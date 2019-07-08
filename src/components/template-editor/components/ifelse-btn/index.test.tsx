import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { IfElseBtn } from '.';

const onClick = () => null;
test('<IfElseBtn />', () => {
  const component: any = shallow(<IfElseBtn onClick={onClick} />);
  expect(toJson(component)).toMatchSnapshot();
});
