import { createFormHook } from '@tanstack/react-form';
import { Loader2 } from 'lucide-react';
import { lazy } from 'react';
import { Button } from '~/components/ui/button';
import { fieldContext, formContext, useFormContext } from './form-context';

const FormFieldCheckbox = lazy(() => import('~/base/components/form-field-checkbox'));
const FormFieldDate = lazy(() => import('~/base/components/form-field-date'));
const FormFieldDateTime = lazy(() => import('~/base/components/form-field-date-time'));
const FormFieldHidden = lazy(() => import('~/base/components/form-field-hidden'));
const FormFieldText = lazy(() => import('~/base/components/form-field-text'));

function SubscribeButton({ label, isPending }: { label: string; isPending: boolean }) {
  const form = useFormContext();

  return (
    <form.Subscribe
      children={([canSubmit, isSubmitting]) => (
        <Button
          disabled={!canSubmit || isSubmitting || isPending}
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {isPending || isSubmitting ? <Loader2 className="animate-spin" size={16} /> : label}
        </Button>
      )}
      selector={(state) => [state.canSubmit, state.isSubmitting]}
    />
  );

  // return (
  //   <form.Subscribe selector={(state) => state.isSubmitting}>
  //     {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
  //   </form.Subscribe>
  // );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormFieldCheckbox,
    FormFieldDate,
    FormFieldDateTime,
    FormFieldHidden,
    FormFieldText,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
