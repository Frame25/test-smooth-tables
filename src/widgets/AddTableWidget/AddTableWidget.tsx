import { PopoverTrigger, PopoverContent, Popover } from '@/shared/ui/popover';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { addField, addTable, clearTableCreate, removeField } from '@/entities/tables/model';
import { useState } from 'react';
import type { TableFieldData, FieldTypes } from '@/entities/tables/model/interfaces';
import { Trash } from 'lucide-react';
import { transformToAlias } from '@/shared/lib/utils';

const defaultField: TableFieldData = {
  title: '',
  key: '',
  type: 'text',
};

export function AddTableWidget() {
  const [tempField, setTempField] = useState<TableFieldData>(defaultField);
  const [tempTableName, setTempTableName] = useState('');
  const [tempTableDescription, setTempTableDescription] = useState('');
  const fields = useAppSelector((state) => state.tableCreate.fields);
  const dispatch = useAppDispatch();

  const handleAddField = () => {
    if (!tempField.title) return;
    dispatch(addField({ ...tempField, key: transformToAlias(tempField.title) }));
    setTempField({ ...defaultField });
  };

  const handleCreateTable = () => {
    if (!fields.length) return;
    dispatch(
      addTable({ name: tempTableName, description: tempTableDescription, fields, rows: [] })
    );
    setTempTableName('');
    setTempTableDescription('');
    setTempField({ ...defaultField });
    dispatch(clearTableCreate());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Create table</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xl w-screen p-2">
        <h2 className="heading-2 mb-4">Configure a table</h2>
        <form>
          <Input
            placeholder="Type table name"
            type="text"
            className="mb-2"
            value={tempTableName}
            onChange={(e) => setTempTableName(e.target.value)}
          />
          <Input
            placeholder="Type table description"
            type="text"
            className="mb-4"
            value={tempTableDescription}
            onChange={(e) => setTempTableDescription(e.target.value)}
          />
          <div className="mb-4">
            {fields.map((field, index) => (
              <div key={index} className="flex gap-2 flex-wrap not-first:border-t p-1 text-sm">
                <div>{field.title}</div>
                <div className="opacity-50">[{field.type}]</div>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="ml-auto h-6 w-6"
                  onClick={() => dispatch(removeField(index))}>
                  <Trash className="size-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            <Input
              placeholder="Type field name"
              type="text"
              className="max-w-1/2 shrink w-auto grow"
              value={tempField.title}
              onChange={(e) => setTempField({ ...tempField, title: e.target.value })}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleAddField();
                }
              }}
            />
            <Select
              onValueChange={(value: FieldTypes) => setTempField({ ...tempField, type: value })}>
              <SelectTrigger className="max-w-1/3 shrink grow">
                <SelectValue placeholder={tempField.type || 'Select field type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleAddField}>
              Add field
            </Button>
          </div>
          <Button type="button" onClick={handleCreateTable}>
            Create
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
