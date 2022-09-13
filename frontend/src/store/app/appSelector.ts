import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';
import { appState } from './types';

export const getAppSelector = (state: AppState) => state.app;

export const getAppDataSelector = createSelector(getAppSelector, (appData: appState) => appData.data);
