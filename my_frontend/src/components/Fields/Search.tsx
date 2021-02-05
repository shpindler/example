import { SearchIcon } from '@/components/Icons/Search'
import { TextField, TextFieldProps } from '@/components/TextField'
import { StringParser } from '@/models/parser'
import { useQueryParam, useQueryParamResult } from '@/utils/query-params'
import React from 'react'

import style from './Search.module.scss'

export interface SearchFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const SearchField: React.ForwardRefExoticComponent<SearchFieldProps> = React.forwardRef(
  function Search({ name = 'search', ...otherProps }, ref) {
    return (
      <TextField
        data-test-id="search"
        ref={ref}
        name={name}
        className={style.Search}
        inputClassName={style.Search__input}
        {...otherProps}
      >
        <SearchIcon className={style.Search__icon} />
      </TextField>
    )
  },
)

export const getSearchParser = (): StringParser => new StringParser('')

export function useSearchQueryParam(): useQueryParamResult<string> {
  return useQueryParam({
    param: 'search',
    parser: getSearchParser(),
  })
}
