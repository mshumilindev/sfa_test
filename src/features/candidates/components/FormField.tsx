import type { ReactNode } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import styles from './RegistrationForm.module.scss';

type FormFieldProps = {
  id: string;
  label: string;
  error?: FieldError | { type?: string; message?: string };
  hint?: string;
  children: (props: { describedBy?: string; invalid: boolean; className: string }) => ReactNode;
};

export const FormField = ({ id, label, error, hint, children }: FormFieldProps) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <p
        className={styles.hint}
        id={hint ? hintId : undefined}
        aria-hidden={hint ? undefined : true}
      >
        {hint}
      </p>
      {children({
        describedBy: describedBy || undefined,
        invalid: Boolean(error),
        className: styles.control,
      })}
      <p
        className={styles.error}
        id={error ? errorId : undefined}
        role={error ? 'alert' : undefined}
        aria-hidden={error ? undefined : true}
      >
        {error?.message}
      </p>
    </div>
  );
};

type TextInputProps = {
  id: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  registration: UseFormRegisterReturn;
  describedBy?: string;
  invalid: boolean;
  className: string;
};

export const TextInput = ({
  id,
  type = 'text',
  registration,
  describedBy,
  invalid,
  className,
}: TextInputProps) => (
  <input
    id={id}
    type={type}
    aria-describedby={describedBy}
    aria-invalid={invalid}
    className={className}
    {...registration}
  />
);
