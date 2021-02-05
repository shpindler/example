import style from '@/components/DateField.module.scss'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { TextField, TextFieldProps } from '@/components/TextField'
import { ru } from 'date-fns/locale'
import { useField } from 'formik'
import React from 'react'
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker'

registerLocale('ru', ru)
setDefaultLocale('ru')

export interface DateFieldInputProps extends TextFieldProps {}

export interface DateFieldProps extends Omit<ReactDatePickerProps, 'name'> {
  inputProps: TextFieldProps
}

export type DateFieldRef = DatePicker

const DateFieldInput = React.forwardRef<HTMLInputElement, DateFieldInputProps>(
  function DateFieldInput_({ onClick, ...otherProps }, ref) {
    return (
      <TextField
        ref={ref}
        inputClassName={style.DateField__input}
        onClick={onClick}
        {...otherProps}
      >
        <CalendarIcon
          className={style.DateField__calendarIcon}
          onClick={onClick as (e: React.MouseEvent) => void}
        />
      </TextField>
    )
  },
)

const DateField_ = React.forwardRef<DateFieldRef, DateFieldProps>(
  function DateField__(
    {
      dateFormat = 'dd.MM.yyyy, HH:mm',
      showTimeInput = true,
      timeInputLabel = 'Время: ',
      showMonthDropdown = true,
      showYearDropdown = true,
      inputProps,
      ...otherProps
    },
    ref,
  ) {
    return (
      <div className={style.DateField}>
        <DatePicker
          ref={ref}
          dateFormat={dateFormat}
          customInput={<DateFieldInput {...inputProps} />}
          showTimeInput={showTimeInput}
          timeInputLabel={timeInputLabel}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          {...otherProps}
        />
      </div>
    )
  },
)

export interface FormikDateFieldProps extends Omit<DateFieldProps, 'onChange'> {
  onChange?: (newValue?: Date | [Date, Date] | null) => void
}

export const FormikDateField = React.forwardRef<
  DateFieldRef,
  FormikDateFieldProps
>(function FormikDateField_(
  { inputProps: { name, error, ...otherInputProps }, ...otherProps },
  ref,
) {
  const [field, meta, helpers] = useField(name)
  return (
    <DateField_
      ref={ref}
      inputProps={{
        ...field,
        isInvalid: meta.touched && !!meta.error && meta.error.length > 0,
        error: error || meta.error,
        ...otherInputProps,
      }}
      {...field}
      selected={field.value}
      onChange={(newValue) => {
        helpers.setValue(newValue)
      }}
      {...otherProps}
    />
  )
})

export const DateField = DateField_
