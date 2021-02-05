import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import { SearchField, useSearchQueryParam } from '@/components/Fields/Search'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface DataViewerSearchContextValue {
  search: string
  setSearch: StateSetter<string>
}

export const DataViewerSearchContext = React.createContext<
  DataViewerSearchContextValue
>({} as DataViewerSearchContextValue)

export function withSearch<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props> {
  return function DataViewerWithSearch({ controls, ...otherProps }) {
    const { t } = useTranslation()
    const [search, setSearch] = useSearchQueryParam()
    const { setFilters } = useContext(DataViewerContext)

    useEffect(() => {
      setFilters((filters) => ({ ...filters, search }))
    }, [search])

    const searchRef = useRef<HTMLInputElement>(null)
    useLayoutEffect(() => {
      if (searchRef.current) {
        searchRef.current.focus()
      }
    }, [])

    return (
      <DataViewerSearchContext.Provider
        value={{
          search,
          setSearch,
        }}
      >
        <DataViewer
          {...(otherProps as Props)}
          controls={
            <>
              <Grid.Col>
                <SearchField
                  label={t('Поиск')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid.Col>
              {controls}
            </>
          }
        />
      </DataViewerSearchContext.Provider>
    )
  }
}
