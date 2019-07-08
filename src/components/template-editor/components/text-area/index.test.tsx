import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { TextArea } from '.';

const textArea = {
  id: 'textArea',
  value: 'textArea',
};

const onSetActiveTextArea = () => null;

test('<TextArea />', () => {
  const component: any = shallow(
    <TextArea
      node={textArea}
      onSetActiveTextArea={onSetActiveTextArea}
      parentNode={[textArea]}
    />
  );
  expect(toJson(component)).toMatchSnapshot();
});
