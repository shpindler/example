import { DataViewerLayoutProps } from '@/components/DataViewer'
import { Grid } from '@/components/Grid'
import React from 'react'

export interface DataViewerDefaultLayoutProps extends DataViewerLayoutProps {}

export const DataViewerDefaultLayout: React.FC<DataViewerDefaultLayoutProps> = ({
  before,
  controls,
  filterControls,
  list,
}: DataViewerLayoutProps): JSX.Element => {
  return (
    <article>
      {before && <Grid.Row className="mb-4">{before}</Grid.Row>}
      {controls && (
        <Grid.Row className="mb-4">
          {filterControls && (
            <Grid.Col>
              <Grid.Row noGutters>{filterControls}</Grid.Row>
            </Grid.Col>
          )}
          {controls}
        </Grid.Row>
      )}
      {list && <Grid.Row>{list}</Grid.Row>}
    </article>
  )
}

export const DataViewerDefaultLayoutWithPaddings: React.FC<DataViewerDefaultLayoutProps> = ({
  list,
  ...otherProps
}: DataViewerLayoutProps): JSX.Element => {
  return (
    <DataViewerDefaultLayout
      {...otherProps}
      list={<Grid.Col>{list}</Grid.Col>}
    />
  )
}
