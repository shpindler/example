import { xlsxPositionsURL } from '@/api/positions'
import { DataViewerProps } from '@/components/DataViewer/index'
import { ExcelBtn } from '@/components/ExcelBtn'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import React from 'react'

export interface withExcelBtnProps {}

export function withExcelBtn<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props> {
  return function DataViewerWithExcelBtn({ before, ...otherProps }) {
    return (
      <DataViewer
        {...(otherProps as Props)}
        before={
          <>
            <Grid.Col xs="auto" className="ml-auto">
              <ExcelBtn href={xlsxPositionsURL} />
            </Grid.Col>
            {before}
          </>
        }
      />
    )
  }
}
