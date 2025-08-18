import { PopoverTrigger, PopoverContent, Popover } from '@/shared/ui/popover';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { addTable, clearTableCreate, removeField } from '@/entities/tables/model';
import { useState } from 'react';
import AddTableField from './AddTableField';
import { Trash } from 'lucide-react';

export function AddTableWidget() {
  const [tempTableName, setTempTableName] = useState('');
  const [tempTableDescription, setTempTableDescription] = useState('');
  const fields = useAppSelector((state) => state.tableCreate.fields);
  const dispatch = useAppDispatch();
  const isDisabled = !tempTableName || !fields.length;

  const handleCreateTable = () => {
    if (isDisabled) return;
    dispatch(
      addTable({ name: tempTableName, description: tempTableDescription, fields, rows: [] })
    );
    setTempTableName('');
    setTempTableDescription('');
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
            required
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
              <div key={index} className="flex gap-2 not-first:border-t p-1 text-sm">
                <div>{field.title}</div>
                <div className="opacity-50">[{field.type}]</div>
                {field.options?.length && (
                  <div className="opacity-50 line-clamp-1">
                    ({field.options?.map((option) => option.label).join(', ')})
                  </div>
                )}
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
          <AddTableField />
          <Button type="button" disabled={isDisabled} onClick={handleCreateTable}>
            Create
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
