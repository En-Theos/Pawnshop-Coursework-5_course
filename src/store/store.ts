import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import lots from '../slices/lots';

export const store = configureStore({
  reducer: {lots}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;