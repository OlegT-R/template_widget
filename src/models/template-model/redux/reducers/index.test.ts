import { templates } from '.';
import { UPDATE_TEMPLATE } from '../actions';

const template = {
  block: [{
    id: 'textArea1',
    value: 'test'
  }]
};

describe('templates reducers', () => {
  test('template_reducer/UPDATE', () => {
    const action = {
      type: UPDATE_TEMPLATE,
      payload: {
        id: 'testId',
        template,
      },
    };

    const newState = templates({}, action);
    expect(newState.testId.template).toBe(template);
    expect(newState).toMatchSnapshot();
  });
});
