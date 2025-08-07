import { configureStore } from '@reduxjs/toolkit';
import { tablesSlice } from '@/entities/tables/model/tablesSlice';
import { tableCreateSlice } from '@/entities/tables/model/tableCreateSlice';

export const store = configureStore({
  reducer: {
    tables: tablesSlice.reducer,
    tableCreate: tableCreateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
