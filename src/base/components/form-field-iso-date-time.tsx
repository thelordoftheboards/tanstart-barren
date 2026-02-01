import { Popover as BaseUiPopover } from '@base-ui/react/popover';
import { IconX } from '@tabler/icons-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import FormFieldInfo from '~/base/components/form-field-info';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { useFieldContext } from '../hooks/form-context';

export default function FormFieldIsoDateTime({
  label,
  className,
  nullable,
  onChange,
}: {
  label: string;
  nullable?: boolean;
  className?: string;
  onChange?: (dtNew: Date | null) => void;
}) {
  const field = useFieldContext<string | null>();
  const { value } = field.state;

  const valueAsDate = value ? new Date(value) : null;

  const handleDateSelect = (selectedDate: Date | null) => {
    if (selectedDate) {
      const dtNew = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

      field.setValue(dtNew.toISOString());
      if (onChange) {
        onChange(dtNew);
      }
    }
  };

  const handleAmPmChange = (amPmNew: 'AM' | 'PM') => {
    const dtNew = new Date(value ?? Date.now());
    const hours = dtNew.getHours();

    if (hours === 0 && amPmNew === 'PM') {
      dtNew.setHours(12);
    } else if (hours === 12 && amPmNew === 'AM') {
      dtNew.setHours(0);
    } else if (hours < 12 && amPmNew === 'PM') {
      dtNew.setHours(hours + 12);
    } else if (hours > 12 && amPmNew === 'AM') {
      dtNew.setHours(hours - 12);
    } else {
      throw new Error('unreachable');
    }

    field.setValue(dtNew.toISOString());
    if (onChange) {
      onChange(dtNew);
    }
  };

  const handleClickHour = (hourNew: number) => {
    const dtNew = new Date(valueAsDate ?? Date.now());

    dtNew.setHours(hourNew + (dtNew.getHours() >= 12 ? 12 : 0));

    field.setValue(dtNew.toISOString());
    if (onChange) {
      onChange(dtNew);
    }
  };

  const handleClickMinute = (minuteNew: number) => {
    const dtNew = new Date(valueAsDate ?? Date.now());

    dtNew.setMinutes(minuteNew);

    field.setValue(dtNew.toISOString());
    if (onChange) {
      onChange(dtNew);
    }
  };

  const handleClickClear: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    field.setValue(null);
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className={cn(className, 'my-2')}>
      <Label htmlFor={field.name}>{label}</Label>
      <div className="mt-1 flex w-full">
        {/* Date popover */}
        <Popover>
          <PopoverTrigger
            render={
              <Button
                className="flex-1 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                data-empty={!valueAsDate}
                variant="outline"
              />
            }
          >
            <CalendarIcon />
            {valueAsDate ? format(valueAsDate, 'MM/dd/yy') : <span>Date</span>}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" onWheel={(e) => e.stopPropagation()}>
            <Calendar
              captionLayout="dropdown"
              endMonth={new Date(new Date().getFullYear() + 5, 1, 1)}
              mode="single"
              onSelect={handleDateSelect}
              // @ts-expect-error Type [Date | null] is not assignable to type [Date | undefined]
              selected={valueAsDate}
            />

            <div className="flex p-2">
              <div className="flex-1" />
              <BaseUiPopover.Close render={<Button variant="outline" />}>Close</BaseUiPopover.Close>
            </div>
          </PopoverContent>
        </Popover>

        {/* Time popover */}
        <Popover>
          <PopoverTrigger
            render={
              <Button
                className="ml-2 flex-1 justify-start pl-2 text-left font-normal data-[empty=true]:text-muted-foreground"
                data-empty={!valueAsDate}
                variant="outline"
              />
            }
          >
            <ClockIcon />
            {valueAsDate ? format(valueAsDate, 'hh:mm aa') : <span>Time</span>}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" onWheel={(e) => e.stopPropagation()}>
            <div className="flex flex-col divide-y">
              {/* Two rows for hours */}
              {[0, 1].map((multiplier) => (
                <div className="flex p-2" key={multiplier}>
                  {[1, 2, 3, 4, 5, 6].map((hourColumn) => {
                    const hour = hourColumn + 6 * multiplier;
                    return (
                      <Button
                        className="aspect-square shrink-0"
                        key={hour}
                        onClick={() => handleClickHour(hour === 12 ? 0 : hour)}
                        size="icon"
                        variant={
                          valueAsDate &&
                          ((hour === 12 && valueAsDate.getHours() % 12 === 0) || valueAsDate.getHours() % 12 === hour)
                            ? 'default'
                            : 'ghost'
                        }
                      >
                        {hour}
                      </Button>
                    );
                  })}
                </div>
              ))}

              {/* Two rows for minutes */}
              {[0, 1].map((multiplier) => (
                <div className="flex p-2" key={multiplier}>
                  {[0, 5, 10, 15, 20, 25].map((minuteColumn) => {
                    const minute = minuteColumn + 30 * multiplier;
                    return (
                      <Button
                        className="aspect-square shrink-0"
                        key={minute}
                        onClick={() => handleClickMinute(minute)}
                        size="icon"
                        variant={valueAsDate && valueAsDate.getMinutes() === minute ? 'default' : 'ghost'}
                      >
                        {minute.toString().padStart(2, '0')}
                      </Button>
                    );
                  })}
                </div>
              ))}

              {/* Row for AM/PM */}
              <div className="flex p-2">
                {['AM', 'PM'].map((amPm) => (
                  <Button
                    className="aspect-square shrink-0"
                    key={amPm}
                    onClick={() => handleAmPmChange(amPm)}
                    size="icon"
                    variant={
                      valueAsDate &&
                      ((amPm === 'AM' && valueAsDate.getHours() < 12) ||
                        (amPm === 'PM' && valueAsDate.getHours() >= 12))
                        ? 'default'
                        : 'ghost'
                    }
                  >
                    {amPm}
                  </Button>
                ))}
              </div>

              {/* Row for close button */}
              <div className="flex p-2">
                <div className="flex-1" />
                <BaseUiPopover.Close render={<Button variant="outline" />}>Close</BaseUiPopover.Close>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear button */}
        {nullable && (
          <Button aria-label="Clear" onClick={handleClickClear} size="icon" variant="ghost">
            <IconX className="h-4 w-4" />
          </Button>
        )}
      </div>
      <FormFieldInfo field={field} />
    </div>
  );
}
