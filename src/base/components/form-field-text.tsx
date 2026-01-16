import FormFieldInfo from '~/base/components/form-field-info';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { useFieldContext } from '../hooks/form-context';

export default function FormFieldText({
  label,
  className,
  placeholder,
  type,
}: {
  label: string;
  className?: string;
  placeholder?: string;
  type?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div className={cn(className, 'my-2')}>
      <Label htmlFor={field.name}>{label}</Label>

      <Input
        className="mt-1"
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
      />

      <FormFieldInfo field={field} />
    </div>
  );
}
