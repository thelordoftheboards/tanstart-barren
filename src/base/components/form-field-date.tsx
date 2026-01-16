import { Popover as BaseUiPopover } from '@base-ui/react/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import FormFieldInfo from '~/base/components/form-field-info';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { useFieldContext } from '../hooks/form-context';

export default function FormFieldDate({
  label,
  nullable,
  className,
}: {
  label: string;
  nullable?: boolean;
  className?: string;
}) {
  const field = useFieldContext<Date | undefined>();

  const { value } = field.state;

  return (
    <div className={cn(className, 'my-2')}>
      <Label htmlFor={field.name}>{label}</Label>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              className="mt-1 w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
              data-empty={!value}
              variant="outline"
            />
          }
        >
          <CalendarIcon />
          {value ? format(value, 'MM/dd/yy') : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="mt-1 w-auto p-0">
          <Calendar
            captionLayout="dropdown"
            endMonth={new Date(new Date().getFullYear() + 5, 1, 1)}
            mode="single"
            onSelect={(newValue) => {
              if (newValue) {
                field.handleChange(newValue);
              }
            }}
            selected={value}
          />

          <div className="flex p-2">
            {nullable && <Button onClick={() => field.setValue(undefined)}>Clear</Button>}
            <div className="flex-1" />
            <BaseUiPopover.Close render={<Button variant="outline" />}>Close</BaseUiPopover.Close>
          </div>
        </PopoverContent>
      </Popover>
      <FormFieldInfo field={field} />
    </div>
  );
}
