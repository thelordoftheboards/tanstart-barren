import type { AnyFieldApi } from '@tanstack/react-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import FormFieldInfo from '~/base/components/form-field-info';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface FormFieldPasswordProps {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
}

export function FormFieldPassword({ field, label, placeholder }: FormFieldPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <Label htmlFor={field.name}>{label}</Label>
      <div className="relative flex w-full items-center justify-end">
        <Input
          autoComplete="new-password"
          className="mt-1"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
          type={isPasswordVisible ? 'text' : 'password'}
          value={field.state.value}
        />
        <Button
          className="absolute mr-2 h-7 w-7 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setIsPasswordVisible(!isPasswordVisible);
          }}
          size="icon"
          tabIndex={-1}
          type="button"
          variant="ghost"
        >
          {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <FormFieldInfo field={field} />
    </>
  );
}
