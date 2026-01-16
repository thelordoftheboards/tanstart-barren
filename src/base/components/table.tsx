import { cn } from '~/lib/utils';

export function Table({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<'table'> & { containerClassName?: string }) {
  return (
    <div className={cn('relative w-full overflow-x-auto', containerClassName)} data-slot="table-container">
      <table className={cn('w-full caption-bottom text-sm', className)} data-slot="table" {...props} />
    </div>
  );
}
