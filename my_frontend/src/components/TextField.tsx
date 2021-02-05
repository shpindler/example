import { FieldError } from '@/components/FieldError'
import { FieldLabel } from '@/components/FieldLabel'
import { FieldProps } from '@/types/field'
import cn from 'classnames'
import { useField } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './TextField.module.scss'

const InputMask = React.lazy(() => import('react-input-mask'))

export interface TextFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'name'>,
    FieldProps {
  mask?: string
}

let idCounter = 0

const TextField_ = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField__(
    {
      autoComplete = 'off',
      children,
      inputClassName,
      className,
      label,
      labelClassName = 'mb-1',
      id,
      name,
      isInvalid = false,
      error = '',
      required = false,
      mask,
      ...otherProps
    },
    ref,
  ) {
    const { t } = useTranslation()
    const _id = id || `text-field-${++idCounter}`
    const commonInputProps = {
      id: _id,
      name,
      className: cn(style.TextField__input, inputClassName),
      autoComplete,
    }
    const Component = mask ? (
      <InputMask inputRef={ref} mask={mask} {...commonInputProps} />
    ) : (
      <input ref={ref} {...commonInputProps} {...otherProps} />
    )
    return (
      <article
        className={cn(style.TextField, className, {
          [style.TextField_invalid]: isInvalid,
          [style.TextField_required]: required,
        })}
      >
        {Component}
        {label && (
          <FieldLabel
            htmlFor={_id}
            className={labelClassName}
            isInvalid={isInvalid}
            required={required}
          >
            {t(label)}
          </FieldLabel>
        )}
        {isInvalid && <FieldError>{t(error)}</FieldError>}
        {children}
      </article>
    )
  },
)

export const FormikTextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps
>(function TextFieldWithFormik({ name, error, ...otherProps }, ref) {
  const [field, meta] = useField(name)
  return (
    <TextField_
      ref={ref}
      isInvalid={
        !!error || (meta.touched && !!meta.error && meta.error.length > 0)
      }
      error={error || meta.error}
      {...field}
      {...otherProps}
    />
  )
})

export const TextField = TextField_
