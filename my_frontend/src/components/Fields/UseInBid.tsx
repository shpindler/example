import { CheckboxProps, FormikCheckbox } from '@/components/Checkbox'
import React from 'react'

export interface UseInBidFieldProps extends Omit<CheckboxProps, 'name'> {
  name?: string
}

export const UseInBidField: React.ForwardRefExoticComponent<UseInBidFieldProps> = React.forwardRef(
  function UseInBidField_(
    { name = 'useInBid', label = 'Доступна в заявках', ...otherProps },
    ref,
  ) {
    return (
      <FormikCheckbox
        data-test-id="use-in-bid"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
