import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import type { SelectOption } from '@/entities/tables/model/interfaces';
import { useState } from 'react';
import { Trash } from 'lucide-react';

export interface AddFieldSelectOptionProps {
  value: SelectOption[];
  onChange: (options: SelectOption[]) => void;
}

const defaultOption: SelectOption = {
  value: '',
  label: '',
};

export default function AddFieldSelectOption({ value, onChange }: AddFieldSelectOptionProps) {
  const [tempOption, setTempOption] = useState<SelectOption>(defaultOption);

  const handleAddOption = () => {
    if (!tempOption.value || !tempOption.label) return;
    onChange([...value, tempOption]);
    setTempOption({ ...defaultOption });
  };

  return (
    <div className="flex flex-wrap gap-2 border-l pl-4 ml-2 pt-2">
      {value.map((option, index) => (
        <div key={index} className="text-sm flex gap-2 w-full mb-2">
          <p className="line-clamp-1 w-1/2">{option.label}</p>
          <span>:</span>
          <p className="line-clamp-1 w-1/2">{option.value}</p>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="ml-auto h-6 w-6"
            onClick={() => onChange(value.filter((_, i) => i !== index))}>
            <Trash className="size-3" />
          </Button>
        </div>
      ))}

      <Input
        placeholder="Type option label"
        type="text"
        className="max-w-1/2 shrink w-auto grow"
        value={tempOption.label}
        onChange={(e) => setTempOption({ ...tempOption, label: e.target.value })}
      />
      <Input
        placeholder="Type option value"
        type="text"
        className="max-w-1/2 shrink w-auto grow"
        value={tempOption.value}
        onChange={(e) => setTempOption({ ...tempOption, value: e.target.value })}
      />

      <Button
        type="button"
        disabled={!tempOption.value || !tempOption.label}
        onClick={handleAddOption}>
        Add option
      </Button>
    </div>
  );
}
