import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import { DataViewerDateFromContext } from '@/components/DataViewer/withDateFrom'
import { DataViewerDateToContext } from '@/components/DataViewer/withDateTo'
import {
  DateFromField,
  useDateFromQueryParam,
} from '@/components/Fields/DateFrom'
import { DateToField, useDateToQueryParam } from '@/components/Fields/DateTo'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import React, { useContext } from 'react'

export interface withDateRangeProps {
  defaultDateFrom?: Date
  defaultDateTo?: Date
}

export function withDateRange<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.FC<Props>): React.FC<Props & withDateRangeProps> {
  return function DataViewerWithDateRange({
    defaultDateFrom,
    defaultDateTo,
    filterControls,
    ...otherProps
  }) {
    const [dateFrom, setDateFrom] = useDateFromQueryParam(defaultDateFrom)
    const [dateTo, setDateTo] = useDateToQueryParam(defaultDateTo)
    const { setFilters } = useContext(DataViewerContext)

    function updateFilters(key: 'dateFrom' | 'dateTo', value: Date): void {
      setFilters((filters) => ({ ...filters, [key]: value }))
    }

    function getRenderDayContentsFor(type: 'dateFrom' | 'dateTo') {
      return function renderDayContents(day: number, date: Date): JSX.Element {
        return (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => undefined}
            onClick={() => {
              setDateTo(date)
              updateFilters(type, date)
            }}
          >
            {day}
          </div>
        )
      }
    }

    return (
      <DataViewerDateFromContext.Provider
        value={{
          dateFrom,
          setDateFrom,
        }}
      >
        <DataViewerDateToContext.Provider value={{ dateTo, setDateTo }}>
          <DataViewer
            {...(otherProps as Props)}
            filterControls={
              <>
                <Grid.Col>
                  <Grid.Row noGutters>
                    <Grid.Col>
                      <DateFromField
                        className="mr-2"
                        selected={dateFrom}
                        onBlur={() => updateFilters('dateFrom', dateFrom)}
                        onChange={(newValue) => setDateFrom(newValue as Date)}
                        renderDayContents={getRenderDayContentsFor('dateFrom')}
                        maxDate={dateTo}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <DateToField
                        selected={dateTo}
                        onBlur={() => updateFilters('dateTo', dateTo)}
                        onChange={(newValue) => setDateTo(newValue as Date)}
                        renderDayContents={getRenderDayContentsFor('dateTo')}
                        minDate={dateFrom}
                      />
                    </Grid.Col>
                  </Grid.Row>
                </Grid.Col>
                {filterControls}
              </>
            }
          />
        </DataViewerDateToContext.Provider>
      </DataViewerDateFromContext.Provider>
    )
  }
}
