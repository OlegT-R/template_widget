import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { IfElseBLock } from '.';

const node = {
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
};

const onDelete = () => null;
const onSetActiveTextArea = () => null;
test('<IfElseBLock />', () => {
  const component: any = shallow(
    <IfElseBLock
      onDelete={onDelete}
      node={node}
      parentNode={[node]}
      onSetActiveTextArea={onSetActiveTextArea}
    />
  );
  expect(toJson(component)).toMatchSnapshot();
});
