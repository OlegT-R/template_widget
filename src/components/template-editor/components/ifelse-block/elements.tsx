import { Button } from 'antd';
import * as styledComponents from 'styled-components';

const { default: styled } = styledComponents;

export const Block = styled.div`
  width: 100%;
`;

export const BlockLine = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: flex-start;
`;

export const OperatorCell = styled.div`
  width: 150px;
`;

export const ContentCell = styled.div`
  width: calc(100% - 150px);
`;

export const StyledBtn = styled(Button)`
  margin-left: 15px;
`;
