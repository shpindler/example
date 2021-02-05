import { DataItemProps } from '@/components/DataViewer'
import { DataViewerUpdateOperationContext } from '@/components/DataViewer/withUpdateOperation'
import { ListItemProps } from '@/components/ListItem'
import { BaseModel } from '@/models/base'
import cn from 'classnames'
import React, { useContext } from 'react'

import style from './withLastModified.module.scss'

export interface withLastModifiedProps {}

export function withLastModified<
  Model extends BaseModel,
  Props extends DataItemProps<Model> & ListItemProps
>(
  Component: React.ComponentType<Props>,
): React.FC<Props & withLastModifiedProps> {
  return function ComponentWithLastModified({
    className,
    item,
    ...otherProps
  }) {
    const { modifiedItems } = useContext(DataViewerUpdateOperationContext)

    const lastModified = modifiedItems[modifiedItems.length - 1]
    const isModified = lastModified ? lastModified.id === item.id : false

    return (
      <Component
        {...(otherProps as Props)}
        className={cn(className, { [style.Modified]: isModified })}
        item={item}
      />
    )
  }
}
