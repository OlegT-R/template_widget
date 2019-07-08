import { ITemplate } from '../../entities';

export const UPDATE_TEMPLATE = 'template/UPDATE';

export interface IUpdateTemplateAction {
  type: string;
  payload: {
    id: string;
    template: ITemplate;
  };
}

export const updateTemplate = (id: string, template: ITemplate) => ({
  type: UPDATE_TEMPLATE,
  payload: {
    id,
    template,
  },
});
