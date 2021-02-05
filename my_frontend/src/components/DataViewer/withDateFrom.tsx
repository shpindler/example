import { DataViewerProps } from '@/components/DataViewer'
import { DataViewerContext } from '@/components/DataViewer/Context'
import { DateFieldRef } from '@/components/DateField'
import {
  DateFromField,
  useDateFromQueryParam,
} from '@/components/Fields/DateFrom'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import React, { useContext, useRef } from 'react'

export interface DataViewerDateFromContextValue {
  dateFrom: Date
  setDateFrom: StateSetter<Date>
}

export type DateFromFilter = Pick<DataViewerDateFromContextValue, 'dateFrom'>

export const DataViewerDateFromContext = React.createContext<
  DataViewerDateFromContextValue
>({} as DataViewerDateFromContextValue)

export interface withDateFromProps {
  defaultDateFrom?: Date
}

export function withDateFrom<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props & withDateFromProps> {
  return function DataViewerWithDateFrom({
    defaultDateFrom,
    filterControls,
    ...otherProps
  }) {
    const [dateFrom, setDateFrom] = useDateFromQueryParam(defaultDateFrom)
    const { setFilters } = useContext(DataViewerContext)

    function updateFilters(date: Date): void {
      setFilters((filters) => ({ ...filters, dateFrom: date }))
    }

    const dateFromRef = useRef<DateFieldRef>(null)

    function renderDayContents(day: number, date: Date): JSX.Element {
      return (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => undefined}
          onClick={() => {
            setDateFrom(date)
            updateFilters(date)
          }}
        >
          {day}
        </div>
      )
    }

    return (
      <DataViewerDateFromContext.Provider
        value={{
          dateFrom,
          setDateFrom,
        }}
      >
        <DataViewer
          {...(otherProps as Props)}
          filterControls={
            <>
              <Grid.Col>
                <DateFromField
                  ref={dateFromRef}
                  selected={dateFrom}
                  onBlur={() => updateFilters(dateFrom)}
                  onChange={(newValue) => setDateFrom(newValue as Date)}
                  renderDayContents={renderDayContents}
                />
              </Grid.Col>
              {filterControls}
            </>
          }
        />
      </DataViewerDateFromContext.Provider>
    )
  }
}
