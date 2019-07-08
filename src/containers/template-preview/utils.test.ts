import { ITemplate } from '../../models/template-model/entities';
import { getMessageFromTemplate, replaceVar } from './utils';

describe('replaceVar tests', () => {
  test('replaceVar should replace variable', () => {
    const stringWithVars = 'test {var1} [[ }}';
    const values = { var1: 'replaced' };
    const result = replaceVar(stringWithVars, values);
    expect(result).toBe('test replaced [[ }}');
  });

  test('replaceVar should replace variable to `` if it not exist in values', () => {
    const stringWithVars = '{var2}test {var1} [[ }}';
    const values = { var1: 'replaced' };
    const result = replaceVar(stringWithVars, values);
    expect(result).toBe('test replaced [[ }}');
  });

  test('replaceVar should work with empty input', () => {
    const stringWithVars = '';
    const values = {};
    const result = replaceVar(stringWithVars, values);
    expect(result).toBe('');
  });
});

const template: ITemplate = {
  block: [
    {
      id: 'Block1Start',
      value: 'Var1{var1}',
    },
    {
      id: '123123',
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

describe('getMessageFromTemplate tests', () => {
  test('Empty input values. Should return else, without `{vars}`', () => {
    const values = {};
    const message = getMessageFromTemplate(values, template);
    expect(message).toBe('Var1else2Var12');
  });

  test('should return else, replace vars by name', () => {
    const values = {
      var1: 'test1',
      var12: 'test12',
    };
    const message = getMessageFromTemplate(values, template);
    expect(message).toBe('Var1test1else2Var12test12');
  });

  test('Has if vars. Should return if`', () => {
    const values = {
      var2: 'var2',
    };
    const message = getMessageFromTemplate(values, template);
    expect(message).toBe('Var1thenvar2Var12');
  });

  test('Has not valid values. Should ignore`', () => {
    const values = {
      notValid1: 'if else then',
      notValid2: '/><script>alert("alert")</script>',
      notValid3: 'for of end while',
    };
    const message = getMessageFromTemplate(values, template);
    expect(message).toBe('Var1else2Var12');
  });

  test('Has not valid template of user input. Should ignore`', () => {
    const values = {
      notValid1: 'if else then',
      notValid2: '/><script>alert("alert")</script>',
      notValid3: 'for of end while',
    };

    const tempWithIssues: ITemplate = {
      block: [
        {
          id: 'id',
          value: 'If{notValid1}then{notValid2}else{notValid3}',
        },
      ],
    };

    const message = getMessageFromTemplate(values, tempWithIssues);
    expect(message).toBe(
      `If${values.notValid1}then${values.notValid2}else${values.notValid3}`
    );
  });
});
