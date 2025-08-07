export type TableCellData = string | number | undefined;

export type FieldTypes = 'text' | 'number' | 'boolean' | 'select';

export type TableFieldData = {
  title: TableCellData;
  key: string | number;
  required?: boolean;
  type: FieldTypes;
  options?: string[];
  render?: (value: TableCellData) => React.ReactNode;
};

export type TableRowData = {
  [key: string | number]: TableCellData;
};

export type TableData = TableRowData[];

export type TableFieldsData = TableFieldData[];

export interface ITableDraft {
  id?: string | number;
  name: string;
  description?: string;
  fields: TableFieldsData;
  rows: TableData;
}

export interface ITable extends ITableDraft {
  id: string | number;
}
