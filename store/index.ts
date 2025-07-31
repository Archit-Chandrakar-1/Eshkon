import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import layoutReducer from './slices/layoutSlice';
import { autosaveMiddleware } from './middleware/autosave';


const persistConfig = {
  key: 'contentful-layout-builder',
  storage,
  whitelist: ['layout'],
};


const rootReducer = {
  layout: persistReducer(persistConfig, layoutReducer),
};


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(autosaveMiddleware),
});

const persistor = persistStore(store);
type RootState = {
  layout: ReturnType<typeof layoutReducer> & { _persist?: any };
};
type AppDispatch = typeof store.dispatch;

export { store, persistor };
export type { RootState, AppDispatch };
