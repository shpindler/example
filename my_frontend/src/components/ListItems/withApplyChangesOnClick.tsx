// Must have DataViewer ancestor.
import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerUpdateOperationContext } from '@/components/DataViewer/withUpdateOperation'
import { ListItemProps } from '@/components/ListItem'
import { BaseModel } from '@/models/base'
import { DestroyAPI, UpdateAPI } from '@/types/api'
import React, { useContext } from 'react'

export interface withApplyChangesOnClick {
  modelId: string
}

export function withApplyChangesOnClick<
  Props extends ListItemProps,
  Model extends BaseModel
>(
  Component: React.ComponentType<Props>,
  service: UpdateAPI<Model> | DestroyAPI<Model>,
  queryData: Partial<Model> = {},
): React.FC<Props & withApplyChangesOnClick> {
  return function ComponentWithApplyChangesOnClick({
    modelId,
    onClick,
    ...otherProps
  }) {
    const { setIsDisabled } = useContext(DataViewerContext)
    const { applyChanges } = useContext(DataViewerUpdateOperationContext)
    return (
      <Component
        {...(otherProps as Props)}
        onClick={(e) => {
          if (onClick) {
            onClick(e)
          }
          setIsDisabled(true)
          service({ id: modelId, ...queryData })
            .then(({ data }) => {
              applyChanges(data)
            })
            .finally(() => {
              setIsDisabled(false)
            })
        }}
      />
    )
  }
}
