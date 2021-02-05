import { DataViewerProps } from '@/components/DataViewer'
import { DataViewerContext } from '@/components/DataViewer/Context'
import { DateFieldRef } from '@/components/DateField'
import { DateToField, useDateToQueryParam } from '@/components/Fields/DateTo'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import React, { useContext, useRef } from 'react'

export interface DataViewerDateToContextValue {
  dateTo: Date
  setDateTo: StateSetter<Date>
}

export type DateToFilter = Pick<DataViewerDateToContextValue, 'dateTo'>

export const DataViewerDateToContext = React.createContext<
  DataViewerDateToContextValue
>({} as DataViewerDateToContextValue)

export interface withDateToProps {
  defaultDateTo?: Date
}

export function withDateTo<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props & withDateToProps> {
  return function DataViewerWithDateTo({
    defaultDateTo,
    filterControls,
    ...otherProps
  }) {
    const [dateTo, setDateTo] = useDateToQueryParam(defaultDateTo)
    const { setFilters } = useContext(DataViewerContext)

    function updateFilters(date: Date): void {
      setFilters((filters) => ({ ...filters, dateTo: date }))
    }

    const dateToRef = useRef<DateFieldRef>(null)

    function renderDayContents(day: number, date: Date): JSX.Element {
      return (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => undefined}
          onClick={() => {
            setDateTo(date)
            updateFilters(date)
          }}
        >
          {day}
        </div>
      )
    }

    return (
      <DataViewerDateToContext.Provider
        value={{
          dateTo,
          setDateTo,
        }}
      >
        <DataViewer
          {...(otherProps as Props)}
          filterControls={
            <>
              <Grid.Col>
                <DateToField
                  ref={dateToRef}
                  selected={dateTo}
                  onBlur={() => updateFilters(dateTo)}
                  onChange={(newValue) => setDateTo(newValue as Date)}
                  renderDayContents={renderDayContents}
                />
              </Grid.Col>
              {filterControls}
            </>
          }
        />
      </DataViewerDateToContext.Provider>
    )
  }
}
