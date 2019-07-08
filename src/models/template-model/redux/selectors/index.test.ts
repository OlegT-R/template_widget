import { defaultVars, getTemplateById, getVarsById } from '.';

const template = {
  block: [{
    id: 'test',
    value: 'test',
  }],
};

describe('template-mode selector tests', () => {
  test('getTemplateById', () => {
    const store = {
      templates: {
        ['test']: {
          template,
          vars: [],
        },
      },
    };

    const existTemplate = getTemplateById('test')(store);
    expect(existTemplate).toBe(template);

    const notExistTemplate = getTemplateById('notExistingId')(store);
    expect(notExistTemplate).toBe(null);
  });

  test('getVarsById', () => {
    const vars = ['var1', 'var2'];
    const store = {
      templates: {
        ['test']: {
          template,
          vars,
        },
      },
    };

    const existVars = getVarsById('test')(store);
    expect(existVars).toBe(vars);

    const notExistVars = getVarsById('notExistingId')(store);
    expect(notExistVars).toBe(defaultVars);
  });
});
