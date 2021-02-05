import { FieldError } from '@/components/FieldError'
import { FieldLabel } from '@/components/FieldLabel'
import { ArrowToLeftIcon } from '@/components/Icons/ArrowToLeft'
import { SpinnerIcon } from '@/components/Icons/Spinner'
import { TextField } from '@/components/TextField'
import { FieldProps } from '@/types/field'
import cn from 'classnames'
import { useField } from 'formik'
import { get, isEqual } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import style from './Select.module.scss'

export interface DefaultSelectOption<ValueType> {
  value: ValueType
  label: string
}

export type SearchLookup<ValueType> = (
  search: string,
  value: ValueType,
) => boolean

export interface SelectProps<
  ValueType,
  OptionType = DefaultSelectOption<ValueType>
> extends FieldProps {
  value?: ValueType | OptionType
  onChange: (value?: ValueType | OptionType) => void
  options?: OptionType[]
  placeholder?: string
  valueKey: keyof OptionType
  labelKey: keyof OptionType
  searchable?: boolean
  searchLookups?: {
    [P in keyof Partial<OptionType>]: SearchLookup<OptionType[P]>
  }
  renderOption?: (
    key: string,
    props: SelectOptionProps<ValueType, OptionType>,
  ) => JSX.Element
  inputRef?: React.Ref<HTMLInputElement>
  loading?: boolean
  isOptionType?: boolean
}

interface SelectOptionProps<ValueType, OptionType>
  extends Pick<SelectProps<ValueType, OptionType>, 'onChange'> {
  id?: string
  selected?: boolean
  disabled?: boolean
  optionRef?: React.Ref<HTMLDivElement>
  label: string
  value: ValueType | OptionType
}

function SelectOption<ValueType, OptionType>({
  optionRef,
  selected = false,
  value,
  label,
  onChange,
  ...otherProps
}: SelectOptionProps<ValueType, OptionType>): JSX.Element {
  return (
    <div
      ref={optionRef}
      role="option"
      aria-selected={selected}
      tabIndex={0}
      className={cn(style.SelectOption, {
        [style.SelectOption_selected]: selected,
      })}
      onClick={() => onChange(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onChange(value)
        }
      }}
      {...otherProps}
    >
      {label}
    </div>
  )
}

interface SelectDropDownProps<ValueType, OptionType>
  extends Required<
      Pick<
        SelectProps<ValueType, OptionType>,
        | 'options'
        | 'valueKey'
        | 'labelKey'
        | 'onChange'
        | 'renderOption'
        | 'isOptionType'
      >
    >,
    Pick<React.ComponentProps<'div'>, 'style'> {
  isOpened?: boolean
  selectedOption?: OptionType
}

function SelectDropDown<ValueType, OptionType>({
  isOpened = false,
  options,
  selectedOption,
  isOptionType,
  onChange,
  renderOption,
  valueKey,
  labelKey,
  ...otherProps
}: SelectDropDownProps<ValueType, OptionType>): JSX.Element {
  const selectedOptionLabel = get(selectedOption, labelKey) as string
  const selectedOptionValue = get(selectedOption, valueKey)

  const ref = useRef<HTMLDivElement>(null)
  const selectedOptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const hasVerticalScrollbar =
        ref.current.scrollHeight > ref.current.clientHeight
      if (hasVerticalScrollbar && isOpened && selectedOptionRef.current) {
        selectedOptionRef.current.scrollIntoView()
      }
    }
  }, [isOpened])

  return createPortal(
    <div ref={ref} className={style.Select__dropdown} {...otherProps}>
      {options.map((o, i) => {
        if (o === selectedOption) {
          return renderOption(i.toString(), {
            value: isOptionType ? o : selectedOptionValue,
            label: selectedOptionLabel,
            onChange,
            optionRef: selectedOptionRef,
            disabled: true,
          })
        }
        return renderOption(i.toString(), {
          value: isOptionType ? o : get(o, valueKey),
          label: get(o, labelKey),
          onChange,
        })
      })}
    </div>,
    document.getElementById('root') as HTMLElement,
  )
}

let idCounter = 0

export function Select<ValueType, OptionType>({
  id,
  className,
  children,
  inputClassName,
  label,
  labelClassName = 'mb-1',
  options = [],
  placeholder = 'Выберите из списка',
  isInvalid = false,
  error = '',
  required = false,
  valueKey,
  labelKey,
  onChange,
  value,
  searchable = false,
  searchLookups,
  renderOption = (
    key,
    { value: _value, label, id = `option-${key}`, ...otherProps },
  ) => {
    return (
      <SelectOption<ValueType, OptionType>
        key={key}
        id={id}
        selected={isEqual(_value, value)}
        value={_value}
        label={label}
        {...otherProps}
      />
    )
  },
  inputRef,
  loading = false,
  isOptionType = false,
  ...otherProps
}: React.PropsWithChildren<SelectProps<ValueType, OptionType>>): JSX.Element {
  const { t } = useTranslation()
  const _id = id || `select-${++idCounter}`
  const selectedOption = isOptionType
    ? options.find((o) => isEqual(get(o, valueKey), get(value, valueKey)))
    : options.find((o) => isEqual(get(o, valueKey), value))
  const selectedOptionLabel = get(selectedOption, labelKey) as string

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (!firstUpdate.current && value !== undefined && !selectedOption) {
      onChange(undefined)
    }
    if (selectedOption) {
      firstUpdate.current = false
    }
  }, [options])

  const [search, setSearch] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const filteredOptions = useMemo(() => {
    if (!searchable) {
      return options
    }
    if (!searchLookups) {
      throw new Error('Please, specify searchLookups.')
    }
    return options.filter((o) => {
      let result = false
      for (const lookup in searchLookups) {
        if (Object.prototype.hasOwnProperty.call(searchLookups, lookup)) {
          result = result || searchLookups[lookup](search, o[lookup])
          if (result) {
            return result
          }
        }
      }
      return result
    })
  }, [search, searchLookups, options])

  const selectRef = useRef<HTMLDivElement>(null)

  function closeDropdownIfOutside(e: MouseEvent): void {
    if (selectRef.current && !e.composedPath().includes(selectRef.current)) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    addEventListener('click', closeDropdownIfOutside)
    return () => {
      removeEventListener('click', closeDropdownIfOutside)
    }
  }, [])

  useEffect(() => {
    setIsOpened(false)
  }, [value])

  const dropDownStyle = (() => {
    let left = '0'
    let top = '0'
    let width = '0'
    if (selectRef.current) {
      const box = selectRef.current.getBoundingClientRect()
      left = box.left + pageXOffset + 'px'
      top = box.top + pageYOffset + box.height + 5 + 'px'
      width = box.width + 'px'
    }
    return { left, top, width }
  })()

  return (
    <div
      className={cn(style.Select, className, {
        [style.Select_invalid]: isInvalid,
        [style.Select_opened]: isOpened,
        [style.Select_searchable]: searchable,
      })}
      {...otherProps}
    >
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
      <div ref={selectRef}>
        <TextField
          ref={inputRef}
          id={_id}
          name={name}
          inputClassName={cn(style.Select__input, inputClassName)}
          value={search || (selectedOption ? selectedOptionLabel : '')}
          readOnly={!searchable}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            searchable && setSearch(e.target.value)
          }
          onClick={() => setIsOpened((oldValue) => !oldValue)}
        >
          {!loading && (
            <ArrowToLeftIcon
              className={cn(style.Select__icon, style.Select__icon_arrow)}
              onClick={() => setIsOpened((oldValue) => !oldValue)}
            />
          )}
          {loading && (
            <SpinnerIcon
              className={cn(style.Select__icon, style.Select__icon_spinner)}
            />
          )}
        </TextField>
        {isOpened && (
          <SelectDropDown
            style={dropDownStyle}
            options={filteredOptions}
            selectedOption={selectedOption}
            isOpened={isOpened}
            valueKey={valueKey}
            labelKey={labelKey}
            renderOption={renderOption}
            isOptionType={isOptionType}
            onChange={onChange}
          />
        )}
      </div>
      {isInvalid && <FieldError>{error}</FieldError>}
      {children}
    </div>
  )
}

export interface FormikSelectProps<
  ValueType,
  OptionType = DefaultSelectOption<ValueType>
> extends Omit<SelectProps<ValueType, OptionType>, 'onChange'>,
    Partial<Pick<SelectProps<ValueType, OptionType>, 'onChange'>> {}

export function FormikSelect<ValueType, OptionType>({
  name,
  error,
  onChange,
  ...otherProps
}: FormikSelectProps<ValueType, OptionType>): JSX.Element {
  const [field, meta, helpers] = useField(name)
  return (
    <Select
      isInvalid={!!error || (!!meta.error && meta.error.length > 0)}
      error={error || meta.error}
      {...field}
      onChange={(value) => {
        if (onChange) {
          onChange(value)
        }
        helpers.setValue(value)
      }}
      {...otherProps}
    />
  )
}
