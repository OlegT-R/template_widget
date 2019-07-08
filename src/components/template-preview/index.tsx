import React, { useState } from 'react';

import { VariableInputs } from './components/variable-inputs';

import {
  ITemplate,
  IVariables,
  VariableNamesType
} from '../../models/template-model/entities';

import { getMessageFromTemplate } from '../../containers/template-preview/utils';

import { PreviewBlock, StyledArea } from './elements';

interface ITemplatePreview {
  arrVarNames: VariableNamesType;
  template: ITemplate;
}

export const TemplatePreview: React.FC<ITemplatePreview> = ({
  arrVarNames,
  template,
}) => {
  const [varValues, updateVarValue] = useState<IVariables>({});

  const onChangeVariable = (name: string, value: string) => {
    varValues[name] = value;
    updateVarValue({ ...varValues });
  };
  const message = getMessageFromTemplate(varValues, template);
  return (
    <PreviewBlock>
      <StyledArea rows={5} value={message} autosize={false} />
      <VariableInputs
        onChangeVariable={onChangeVariable}
        arrVarNames={arrVarNames}
      />
    </PreviewBlock>
  );
};
