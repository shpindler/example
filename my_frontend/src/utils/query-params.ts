import { BaseParser } from '@/models/parser'
import { StateSetter } from '@/types'
import { useEffect, useState } from 'react'

export type useQueryParamResult<T> = [T, StateSetter<T>]
export type useQueryParamArg<T> = {
  param: string
  parser: BaseParser<T>
  clearParamFromURLIf?: (value: T) => boolean
}
export function useQueryParam<T>({
  param,
  parser,
  clearParamFromURLIf = (value) => !value,
}: useQueryParamArg<T>): useQueryParamResult<T> {
  let disableHistoryChanges = false
  const state = useState(() => {
    disableHistoryChanges = true
    const params = new URLSearchParams(window.location.search)
    return parser.parse(params.get(param) || '')
  })

  function onPopState(e: PopStateEvent): void {
    disableHistoryChanges = true
    if (param in e.state) {
      state[1](parser.parse(e.state[param]))
    }
  }

  useEffect(() => {
    addEventListener('popstate', onPopState)
    return () => {
      removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    if (disableHistoryChanges) {
      disableHistoryChanges = false
      return
    }
    const newParams = new URLSearchParams(window.location.search)
    const unparsed = parser.unParse(state[0])
    if (!clearParamFromURLIf(state[0])) {
      newParams.set(param, unparsed)
    } else {
      newParams.delete(param)
    }
    if (!history.state || unparsed !== history.state[param]) {
      const url = newParams.toString()
        ? location.pathname + '?' + newParams.toString()
        : location.pathname
      history.pushState(
        {
          ...history.state,
          [param]: unparsed,
        },
        '',
        url,
      )
    }
  }, [state[0]])

  return state
}
