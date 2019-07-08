import typeToReducer from 'type-to-reducer';
import { ITemplate, VariableNamesType } from '../../entities';

import { IUpdateTemplateAction, UPDATE_TEMPLATE } from '../actions';

export interface ITemplatesState {
  [key: string]: {
    template: ITemplate;
    vars: VariableNamesType;
  };
}

export const templatesInitState: ITemplatesState = {};

export const templates = typeToReducer(
  {
    [UPDATE_TEMPLATE]: (
      state: ITemplatesState,
      action: IUpdateTemplateAction
    ): ITemplatesState => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        template: action.payload.template,
      },
    }),
  },
  templatesInitState
);
