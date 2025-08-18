import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  ITable,
  ITableDraft,
  TableRowData,
  TableFieldsData,
  SelectOption,
} from './interfaces';

const initialState: { tables: ITable[] } = {
  tables: [],
};

// Helper function to create default value based on field type
const getDefaultValueForFieldType = (field: TableFieldsData[0]): string | number | undefined => {
  switch (field.type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return 'false';
    case 'select':
      return field.options && field.options.length > 0 ? field.options[0].value : '';
    default:
      return '';
  }
};

// Helper function to create a new row with default values based on field types
const createNewRowWithDefaults = (fields: TableFieldsData): TableRowData => {
  const newRow: TableRowData = {};

  fields.forEach((field) => {
    newRow[field.key] = getDefaultValueForFieldType(field);
  });

  return newRow;
};

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<ITableDraft>) => {
      const table = action.payload;
      table.id = nanoid();

      // Create a single default row if fields are defined
      const initialRows =
        table.fields && table.fields.length > 0 ? [createNewRowWithDefaults(table.fields)] : [];

      state.tables = [...state.tables, { ...table, rows: initialRows } as ITable];
    },
    addTableAtIndex: (state, action: PayloadAction<{ index: number; table: ITableDraft }>) => {
      const { index, table } = action.payload;
      table.id = nanoid();
      state.tables = [
        ...state.tables.slice(0, index),
        { ...table, rows: [] } as ITable,
        ...state.tables.slice(index),
      ];
    },
    duplicateTable: (state, action: PayloadAction<string | number>) => {
      const tableId = action.payload;
      const tableIndex = state.tables.findIndex((table) => table.id === tableId);
      if (tableIndex !== -1) {
        const table = state.tables[tableIndex];
        state.tables = [
          ...state.tables.slice(0, tableIndex + 1),
          { ...table, id: nanoid() },
          ...state.tables.slice(tableIndex + 1),
        ];
      }
    },
    removeTable: (state, action: PayloadAction<string | number>) => {
      state.tables = state.tables.filter((table) => table.id !== action.payload);
    },
    addRowToTable: (state, action: PayloadAction<string | number>) => {
      const tableId = action.payload;
      const tableIndex = state.tables.findIndex((table) => table.id === tableId);

      if (tableIndex !== -1) {
        const table = state.tables[tableIndex];

        // Create a new row with default values using the helper function
        const newRow = createNewRowWithDefaults(table.fields);

        // Add the new row to the table
        state.tables[tableIndex] = {
          ...table,
          rows: [...table.rows, newRow],
        };
      }
    },
    updateTableCell: (
      state,
      action: PayloadAction<{
        tableId: string | number;
        rowIndex: number;
        fieldKey: string | number;
        value: string | number | SelectOption | undefined;
      }>
    ) => {
      const { tableId, rowIndex, fieldKey, value } = action.payload;
      const tableIndex = state.tables.findIndex((table) => table.id === tableId);

      if (tableIndex !== -1 && state.tables[tableIndex].rows[rowIndex]) {
        const _value = typeof value === 'object' ? value.value : value;
        // Update the cell value
        state.tables[tableIndex].rows[rowIndex][fieldKey] = _value;
      }
    },
  },
});

export const {
  addTable,
  addTableAtIndex,
  removeTable,
  addRowToTable,
  updateTableCell,
  duplicateTable,
} = tablesSlice.actions;
export default tablesSlice.reducer;
