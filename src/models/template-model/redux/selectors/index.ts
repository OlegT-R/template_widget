import { createSelector } from 'reselect';
import { IStore } from '../../../../store/types';
import { ITemplate, VariableNamesType } from '../../entities';
import { ITemplatesState } from '../reducers';

export const getTemplates = (state: IStore): ITemplatesState => state.templates;

export const defaultVars = ['firstname', 'lastname', 'company', 'position'];

export const getTemplateById = (id: string) =>
  createSelector(
    [getTemplates],
    (templates: ITemplatesState): ITemplate =>
      (templates[id] && templates[id].template) || null
  );

export const getVarsById = (id: string) =>
  createSelector(
    [getTemplates],
    (templates: ITemplatesState): VariableNamesType =>
      (templates[id] && templates[id].vars) || defaultVars
  );
