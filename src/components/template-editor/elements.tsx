import { Button } from 'antd';
import * as styledComponents from 'styled-components';

const { default: styled } = styledComponents;

export const EditorContainer = styled.div`
  width: 800px;
  height: auto;
  min-height: 300px;
  margin: 0 auto;
  position: relative;
`;

export const IfElseBox = styled.div`
  text-align: center;
  margin-top: 15px;
`;

export const TemplateBox = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px 0 10px 0;
`;

export const StyledBtn = styled(Button)`
  margin-right: 15px;
`;
