import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TableFieldData } from './interfaces';

interface ITableCreate {
  name: string;
  description: string;
  fields: TableFieldData[];
}

const initialState: ITableCreate = {
  name: '',
  description: '',
  fields: [],
};

export const tableCreateSlice = createSlice({
  name: 'tableCreate',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addField: (state, action: PayloadAction<TableFieldData>) => {
      state.fields = [...state.fields, action.payload];
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.fields = state.fields.filter((_, index) => index !== action.payload);
    },
    clearTableCreate: (state) => {
      state.name = '';
      state.description = '';
      state.fields = [];
    },
  },
});

export const { setName, setDescription, addField, removeField, clearTableCreate } =
  tableCreateSlice.actions;
export default tableCreateSlice.reducer;
