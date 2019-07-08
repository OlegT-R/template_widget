import React from 'react';

import { BtnsBox, Label, VarInput } from './elements';

interface IVarsProps {
  arrVarNames: string[];
  onChangeVariable: (name: string, value: string) => void;
}

export const VariableInputs: React.FC<IVarsProps> = ({
  arrVarNames,
  onChangeVariable,
}) => (
  <BtnsBox>
    <Label>Variables:</Label>
    {arrVarNames.map((name: string) => (
      <VarInput
        key={name}
        addonBefore={name}
        onChange={e => {
          onChangeVariable(name, e.target.value);
        }}
      />
    ))}
  </BtnsBox>
);
