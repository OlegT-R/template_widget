import { Input } from 'antd';
import * as styledComponents from 'styled-components';

const { default: styled } = styledComponents;
const { TextArea } = Input;

export const PreviewBlock = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  min-height: 200px;
  margin: 0 auto;
  position: relative;
`;
export const StyledArea = styled(TextArea)`
  resize: none;
`;
