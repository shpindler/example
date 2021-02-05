import { CheckIcon } from '@/components/Icons/Check'
import cn from 'classnames'
import { useField } from 'formik'
import React from 'react'

import style from './Checkbox.module.scss'

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  label?: string
  labelClassName?: string
  name: string
  variant?: string
}

let idCounter = 0

const Checkbox_: React.ForwardRefExoticComponent<CheckboxProps> = React.forwardRef(
  function CheckboxField(
    {
      children,
      className,
      label,
      labelClassName = 'mb-1',
      id,
      name,
      variant = 'gray',
      checked = false,
      ...otherProps
    },
    ref,
  ) {
    const _id = id || `checkbox-${++idCounter}`
    return (
      <article
        className={cn(style.Checkbox, className, {
          [style[`Checkbox_${variant}`]]: variant,
        })}
      >
        <input
          id={_id}
          name={name}
          ref={ref}
          type="checkbox"
          className={style.Checkbox__input}
          checked={checked}
          {...otherProps}
        />
        {label && (
          <label
            htmlFor={_id}
            className={cn(style.Checkbox__label, labelClassName)}
          >
            <section>
              <CheckIcon className={style.Checkbox__icon} />
              {label}
            </section>
          </label>
        )}
        {children}
      </article>
    )
  },
)

export const FormikCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function CheckboxWithFormik({ name, ...otherProps }, ref) {
    const [field] = useField(name)
    return (
      <Checkbox_ ref={ref} checked={field.value} {...field} {...otherProps} />
    )
  },
)

export const Checkbox = Checkbox_
