import React from 'react';
import { connect } from 'react-redux';

import {
  getTemplateById,
  getVarsById
} from '../../models/template-model/redux/selectors';

import { TemplatePreview } from '../../components/template-preview';
import {
  ITemplate,
  VariableNamesType
} from '../../models/template-model/entities';

import { IStore } from '../../store/types';

interface IPreviewProps {
  readonly template: ITemplate;
  readonly arrVarNames: VariableNamesType;
}

const id = 'test123uuid';

export const TemplatePreviewWidget: React.FC<IPreviewProps> = props => (
  <TemplatePreview {...props} />
);

const mapStateToProps = (store: IStore) => ({
  template: getTemplateById(id)(store),
  arrVarNames: getVarsById(id)(store),
});

export default connect(mapStateToProps)(TemplatePreviewWidget);
