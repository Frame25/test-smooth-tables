import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import type { TableFieldData, FieldTypes, SelectOption } from '@/entities/tables/model/interfaces';
import { useState, memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { addField } from '@/entities/tables/model';
import { transformToAlias } from '@/shared/lib/utils';
import AddFieldSelectOption from './AddFieldSelectOption';

const defaultField: TableFieldData = {
  title: '',
  key: '',
  type: 'text',
};

export default memo(function AddTableField() {
  const dispatch = useAppDispatch();
  const [tempField, setTempField] = useState<TableFieldData>(defaultField);

  const handleAddField = () => {
    if (!tempField.title) return;
    dispatch(addField({ ...tempField, key: transformToAlias(tempField.title) }));
    setTempField({ ...defaultField });
  };

  return (
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
        value={tempField.type}
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
      <Button type="button" disabled={!tempField.title} onClick={handleAddField}>
        Add field
      </Button>
      {tempField.type === 'select' && (
        <AddFieldSelectOption
          value={tempField.options || []}
          onChange={(options: SelectOption[]) => setTempField({ ...tempField, options })}
        />
      )}
    </div>
  );
});
