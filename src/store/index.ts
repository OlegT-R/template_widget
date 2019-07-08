import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { migrations } from './migrations';
import * as reducers from './reducers';

const persistConfig = {
  key: 'app',
  version: 2,
  migrate: createMigrate(migrations),
  storage,
};

const reducer = combineReducers({
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {};

export const store = createStore(persistedReducer, initialState, devToolsEnhancer({}));

export const persistor = persistStore(store);
