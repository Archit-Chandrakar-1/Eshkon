'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import LayoutBuilder from '@/components/ContentfulApp/LayoutBuilder';

export default function ContentfulAppPage() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <LayoutBuilder />
      </PersistGate>
    </Provider>
  );
}