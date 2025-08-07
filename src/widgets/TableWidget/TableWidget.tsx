import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addRowToTable, updateTableCell } from '@/entities/tables/model/tablesSlice';
import type { ITable, TableFieldData } from '@/entities/tables/model/interfaces';

interface TableWidgetProps {
  table: ITable;
  className?: string;
  slotTop?: React.ReactNode;
}

interface EditingCell {
  rowIndex: number;
  fieldKey: string | number;
}

export const TableWidget: React.FC<TableWidgetProps> = ({ table, className, slotTop }) => {
  const dispatch = useDispatch();
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);

  if (!table || !table.fields || !table.rows) {
    return <div>No table data available</div>;
  }

  const handleAddRow = () => {
    dispatch(addRowToTable(table.id));
  };

  const handleCellClick = (rowIndex: number, fieldKey: string | number) => {
    setEditingCell({ rowIndex, fieldKey });
  };

  const handleCellValueChange = (value: string | number | undefined) => {
    if (editingCell) {
      dispatch(
        updateTableCell({
          tableId: table.id,
          rowIndex: editingCell.rowIndex,
          fieldKey: editingCell.fieldKey,
          value,
        })
      );
    }
  };

  const handleInputBlur = () => {
    setEditingCell(null);
  };

  const handleSelectChange = (value: string) => {
    if (editingCell) {
      dispatch(
        updateTableCell({
          tableId: table.id,
          rowIndex: editingCell.rowIndex,
          fieldKey: editingCell.fieldKey,
          value,
        })
      );
      setEditingCell(null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCell) {
      const value = e.target.checked ? 'true' : 'false';
      dispatch(
        updateTableCell({
          tableId: table.id,
          rowIndex: editingCell.rowIndex,
          fieldKey: editingCell.fieldKey,
          value,
        })
      );
      setEditingCell(null);
    }
  };

  const renderCellContent = (
    rowIndex: number,
    field: TableFieldData,
    cellValue: string | number | undefined
  ) => {
    const isEditing =
      editingCell && editingCell.rowIndex === rowIndex && editingCell.fieldKey === field.key;

    if (isEditing) {
      switch (field.type) {
        case 'text':
          return (
            <Input
              autoFocus
              type="text"
              defaultValue={cellValue as string}
              onBlur={(e) => {
                handleCellValueChange(e.target.value);
                handleInputBlur();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCellValueChange((e.target as HTMLInputElement).value);
                  handleInputBlur();
                } else if (e.key === 'Escape') {
                  handleInputBlur();
                }
              }}
            />
          );
        case 'number':
          return (
            <Input
              autoFocus
              type="number"
              defaultValue={cellValue as number}
              onBlur={(e) => {
                handleCellValueChange(e.target.value ? Number(e.target.value) : 0);
                handleInputBlur();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  handleCellValueChange(value ? Number(value) : 0);
                  handleInputBlur();
                } else if (e.key === 'Escape') {
                  handleInputBlur();
                }
              }}
            />
          );
        case 'boolean':
          return (
            <Checkbox
              autoFocus
              defaultChecked={cellValue === 'true'}
              onChange={handleCheckboxChange}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleInputBlur();
                }
              }}
            />
          );
        case 'select':
          return (
            <Select defaultValue={cellValue as string} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                )) || []}
              </SelectContent>
            </Select>
          );
        default:
          return cellValue as React.ReactNode;
      }
    }

    return field.render ? field.render(cellValue) : (cellValue as React.ReactNode);
  };

  return (
    <div className={className}>
      {table.name && <h2 className="heading-4 underline mb-4">{table.name}</h2>}
      {slotTop}
      <Table>
        {table.description && <TableCaption>{table.description}</TableCaption>}
        <TableHeader>
          <TableRow>
            {table.fields.map((field) => (
              <TableHead key={field.key}>{field.title as React.ReactNode}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          onClick={(e) => {
            // Event bubbling for cell clicks
            const target = e.target as HTMLElement;
            const cell = target.closest('td');

            if (cell && !editingCell) {
              // Find the data-row-index and data-field-key attributes
              const rowIndex = cell.getAttribute('data-row-index');
              const fieldKey = cell.getAttribute('data-field-key');

              if (rowIndex !== null && fieldKey !== null) {
                handleCellClick(parseInt(rowIndex, 10), fieldKey);
              }
            }
          }}>
          {table.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {table.fields.map((field) => {
                const cellValue = row[field.key];
                return (
                  <TableCell
                    key={`${rowIndex}-${field.key}`}
                    data-row-index={rowIndex}
                    data-field-key={field.key}
                    className="text-left">
                    {renderCellContent(rowIndex, field, cellValue)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={table.fields.length} className="text-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddRow}
                className="mx-auto"
                aria-label="Add new row">
                <Plus className="h-4 w-4 text-green-400 border rounded-full border-green-200" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
