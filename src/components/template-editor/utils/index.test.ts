import { defaultToEmptyTemplate, getFirstTextArea } from '.';
import { ITemplate } from '../../../models/template-model/entities';

const deepTemplate: ITemplate = {
  block: [
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

describe('template-editor utils', () => {
  test('getFirstTextArea should return first texarea in if block', () => {
    const firstTextAreaNode = getFirstTextArea(deepTemplate.block);
    expect(firstTextAreaNode.node.value).toEqual('Block2If');
  });

  test('getFirstTextArea should return first texarea in template.block[0]', () => {
    const block = [
      {
        id: 'id',
        value: 'test',
      },
    ];
    const firstTextAreaNode = getFirstTextArea(block);
    expect(firstTextAreaNode.node.value).toEqual('test');
  });

  test('defaultToEmptyTemplate', () => {
    const template = defaultToEmptyTemplate();
    expect(template).not.toBe(undefined);
    expect(template.block.length).not.toBe(0);

    const fullTemplate = {
      block: [
        {
          id: 'id',
          value: 'test',
        },
      ],
    };
    const withDefault = defaultToEmptyTemplate(fullTemplate);
    expect(withDefault).toBe(fullTemplate);
  });
});
