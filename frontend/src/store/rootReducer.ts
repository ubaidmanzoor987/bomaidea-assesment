import { combineReducers } from '@reduxjs/toolkit';

import app from './app';

const rootReducer = combineReducers({
  app,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
