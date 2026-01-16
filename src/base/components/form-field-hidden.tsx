import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '../hooks/form-context';

export default function FormFieldHidden({ label }: { label: string }) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <>
      <input type="hidden" value={JSON.stringify(field.state.value)} {...field.props} />

      {errors.map((error: string) => (
        <>
          <div>{label}</div>
          <div key={error} style={{ color: 'red' }}>
            {error}
          </div>
        </>
      ))}
    </>
  );
}
