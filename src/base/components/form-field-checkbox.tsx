import FormFieldInfo from '~/base/components/form-field-info';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { useFieldContext } from '../hooks/form-context';

export default function FormFieldCheckbox({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <>
      <div className="flex items-center gap-3">
        <Checkbox
          // biome-ignore lint/complexity/noUselessTernary: Allow
          checked={field.state.value ? true : false}
          id={field.name}
          onCheckedChange={(value: boolean) => {
            field.setValue(`${value}`);
          }}
        />
        <Label htmlFor={field.name}>{label}</Label>
      </div>

      <FormFieldInfo field={field} />
    </>
  );
}
