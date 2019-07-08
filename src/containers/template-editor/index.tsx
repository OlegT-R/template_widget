import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Modal } from 'antd';

import {
  getTemplateById,
  getVarsById
} from '../../models/template-model/redux/selectors';

import { TemplateEditor } from '../../components/template-editor';
import { ITemplate } from '../../models/template-model/entities';
import {
  IUpdateTemplateAction,
  updateTemplate
} from '../../models/template-model/redux/actions';

import { Dispatch, IStore } from '../../store/types';
import { TemplatePreviewWidget } from '../template-preview';

import { defaultToEmptyTemplate } from '../../components/template-editor/utils';

interface IEditorProps {
  readonly template?: ITemplate;
  readonly arrVarNames: string[];
  callbackSave: (template: ITemplate) => void;
}
const TEMPLATE_ID = 'test123uuid';

export const TemplateEditorWidget: React.FC<IEditorProps> = ({
  template,
  arrVarNames,
  callbackSave,
}) => {
  const withDefaultTemplate = defaultToEmptyTemplate(template);
  const [preview, setPreview] = useState({
    template: withDefaultTemplate,
    show: false,
  });

  const hideModal = () =>
    setPreview({
      ...preview,
      show: false,
    });

  const showPreview = (previewTemplate: ITemplate) => {
    setPreview({
      template: previewTemplate,
      show: true,
    });
  };

  return (
    <>
      <TemplateEditor
        template={withDefaultTemplate}
        arrVarNames={arrVarNames}
        callbackSave={callbackSave}
        showPreview={showPreview}
      />
      <Modal
        title='Message Preview'
        visible={preview.show}
        onCancel={hideModal}
        footer={<Button onClick={hideModal}>Close</Button>}
      >
        <TemplatePreviewWidget
          template={preview.template}
          arrVarNames={arrVarNames}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  template: getTemplateById(TEMPLATE_ID)(store),
  arrVarNames: getVarsById(TEMPLATE_ID)(store),
});

const mapDispatchToProps = (dispatch: Dispatch<IUpdateTemplateAction>) => ({
  callbackSave: (template: ITemplate) =>
    dispatch(updateTemplate(TEMPLATE_ID, template)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateEditorWidget);
