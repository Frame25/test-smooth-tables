import { Button } from '@/shared/ui/button';
import { useAppDispatch } from '@/shared/lib/hooks';
import { addTable } from '@/entities/tables/model';
import { createMockTables } from '@/shared/lib/mock-data';
import { Database } from 'lucide-react';

export function MockDataWidget() {
  const dispatch = useAppDispatch();

  const handlePopulateMockData = () => {
    const mockTables = createMockTables();
    
    // Add each mock table to the store
    mockTables.forEach((table) => {
      dispatch(addTable(table));
    });
  };

  return (
    <Button 
      onClick={handlePopulateMockData} 
      variant="outline"
      className="flex items-center gap-2"
    >
      <Database className="h-4 w-4" />
      Populate with Mock Data
    </Button>
  );
}
