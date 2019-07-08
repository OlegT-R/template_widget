import React from 'react';

import { Button } from 'antd';
import { Operator } from './elements';

interface IIfElseBtnProps {
  onClick: () => any;
}

export const IfElseBtn: React.FC<IIfElseBtnProps> = ({ onClick }) => (
  <Button type='dashed' onClick={onClick}>
    Click to Add: <Operator>IF</Operator>
    {'{{some_variable} or expression}'}
    <Operator>THEN</Operator>
    {'{then_value}'}
    <Operator>ELSE</Operator>
    {'{else_value}'}
  </Button>
);
