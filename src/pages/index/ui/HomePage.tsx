import './HomePage.css';
import { AddTableWidget } from '@/widgets/AddTableWidget';
import { MockDataWidget } from '@/widgets/MockDataWidget';
import { useAppSelector } from '@/shared/lib/hooks';
import { TableWidget } from '@/widgets/TableWidget';
import { Button } from '@/shared/ui/button';
import { Trash, SquaresSubtract } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeTable, duplicateTable } from '@/entities/tables/model/tablesSlice';

function HomePage() {
  const tables = useAppSelector((state) => state.tables.tables);
  const dispatch = useDispatch();
  return (
    <div className="grow">
      <h1 className="heading mb-8">Smooth tables</h1>

      <div className="flex gap-4 mb-8">
        <AddTableWidget />
        <MockDataWidget />
      </div>

      <div className="flex flex-wrap gap-4">
        {tables.map((table) => (
          <TableWidget
            key={table.id}
            table={table}
            className="block shadow-lg p-1 w-full shrink-0 grow basis-auto sm:w-1/2 sm:shrink sm:basis-1/3 md:w-1/3 md:basis-1/4"
            slotTop={
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(duplicateTable(table.id))}>
                  <SquaresSubtract className="h-3 w-3 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => dispatch(removeTable(table.id))}>
                  <Trash className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
