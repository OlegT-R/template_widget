import React from 'react';

import { BtnsBox, VarBtn } from './elements';

interface IVarsProps {
  arrVarNames: string[];
  onBtnClick: (name: string) => void;
}

export const VariableNameBtns: React.FC<IVarsProps> = ({
  arrVarNames,
  onBtnClick,
}) => (
  <BtnsBox>
    {arrVarNames.map((name: string) => (
      <VarBtn
        key={name}
        type='primary'
        onClick={() => onBtnClick(name)}
      >{`{${name}}`}</VarBtn>
    ))}
  </BtnsBox>
);
