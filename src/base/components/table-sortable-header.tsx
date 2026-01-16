import { TableHead } from '~/components/ui/table';

type SortDirection = 'asc' | 'desc';

export function TableSortableHeader<T>({
  field,
  children,
  sortField,
  sortDirection,
  onSort,
}: {
  field: keyof T;
  children: React.ReactNode;
  sortField: keyof T;
  sortDirection: SortDirection;
  onSort: (field: keyof T) => void;
}) {
  const isActive = sortField === field;
  let direction = '';
  if (isActive) {
    direction = sortDirection === 'asc' ? '↑' : '↓';
  }

  return (
    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => onSort(field)}>
      <div className="flex items-center gap-1">
        {children}
        <span className="min-w-16 text-muted-foreground text-xs">{direction}</span>
      </div>
    </TableHead>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: Allow
// biome-ignore lint/style/useConsistentArrayType: Allow
export function sortArrayBySortField(arr: Array<any>, sortField: string, sortDirection: SortDirection) {
  return [...arr].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null || aValue === undefined) {
      return 1;
    }
    if (bValue === null || bValue === undefined) {
      return -1;
    }

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });
}
