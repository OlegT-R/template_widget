import React from 'react';

import { ITemplate } from '../../models/template-model/entities';
import { IfElseBtn } from './components/ifelse-btn';

import { getTemplateNode } from './components/template-node-switcher';
import { VariableNameBtns } from './components/variable-name-buttons';
import { EditorContainer, IfElseBox, StyledBtn, TemplateBox } from './elements';
import {
  useActiveTextArea,
  useAddIfElse,
  useAddVariable,
  useDeleteBlock
} from './utils/hooks';

interface IEditorProps {
  arrVarNames: string[];
  template: ITemplate;
  callbackSave: (template: ITemplate) => void;
  showPreview: (template: ITemplate) => void;
}

export const TemplateEditor: React.FC<IEditorProps> = ({
  arrVarNames,
  callbackSave,
  template,
  showPreview,
}) => {
  // Deep cloning blocks, because using mutating object
  const cloningTemplate = JSON.parse(JSON.stringify(template));

  const { onDelete, block, updateTemplate } = useDeleteBlock(cloningTemplate);

  const {
    onSetActiveTextArea,
    activeTextArea,
    setTextAreaPosition,
  } = useActiveTextArea(block);

  const addIfElse = useAddIfElse(
    activeTextArea,
    updateTemplate,
    setTextAreaPosition
  );

  const addVariable = useAddVariable(
    updateTemplate,
    activeTextArea,
    setTextAreaPosition
  );

  return (
    <EditorContainer>
      <VariableNameBtns arrVarNames={arrVarNames} onBtnClick={addVariable} />
      <IfElseBox>
        <IfElseBtn onClick={addIfElse} />
      </IfElseBox>
      <TemplateBox>
        {getTemplateNode(block, onDelete, onSetActiveTextArea)}
      </TemplateBox>
      <StyledBtn onClick={() => showPreview({ block })}>Show Preview</StyledBtn>
      <StyledBtn type='primary' onClick={() => callbackSave({ block })}>
        Save
      </StyledBtn>
    </EditorContainer>
  );
};
