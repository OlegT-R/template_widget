import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../../store';

import TemplateEditorWidget from '../../containers/template-editor';
import { AppBox } from './elements';

const Index: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppBox>
          <Button type='primary' onClick={() => setVisible(true)}>
            Open Editor Modal
          </Button>
          <Modal
            title='Message Template Editor'
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={
              <Button onClick={() => setVisible(false)}>Close</Button>
            }
            width={850}
          >
            <TemplateEditorWidget />
          </Modal>
        </AppBox>
      </PersistGate>
    </Provider>
  );
};

export default Index;
