import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import lots from '../slices/lots';
import modal from '../slices/modal';
import user from '../slices/user';

export const store = configureStore({
  reducer: {lots, modal, user}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;