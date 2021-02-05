// Must be use together with withCRUDOperations HOC.
import { Alert } from '@/components/Alert'
import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import {
  CreateUpdateFormProps,
  DataViewerCRUDOperationsContext,
} from '@/components/DataViewer/withCRUDOperations'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { BaseModel } from '@/models/base'
import React, { useContext, useMemo, useState } from 'react'

export interface withUpdateOperationProps<ModelType extends typeof BaseModel> {
  UpdateForm: React.ComponentType<CreateUpdateFormProps<ModelType>>
}

export interface DataViewerUpdateOperationContextValue<
  Model extends BaseModel
> {
  applyChanges: (updatedItem: Model) => void
  modifiedItems: Pick<Model, 'id'>[]
}

export const DataViewerUpdateOperationContext = React.createContext<
  DataViewerUpdateOperationContextValue<BaseModel>
>({} as DataViewerUpdateOperationContextValue<BaseModel>)

export function withUpdateOperation<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(
  DataViewer: React.ComponentType<Props>,
): React.FC<Props & withUpdateOperationProps<ModelType>> {
  return function DataViewerWithUpdateOperation({
    DataItem,
    UpdateForm,
    ...otherProps
  }) {
    const {
      selectedItem,
      setSelectedItem,
      formAction,
      setFormAction,
    } = useContext(DataViewerCRUDOperationsContext)
    const { setData } = useContext(DataViewerContext)
    const [modifiedItems, setModifiedItems] = useState<
      Pick<InstanceType<ModelType>, 'id'>[]
    >([])

    function applyChanges(item: InstanceType<ModelType>) {
      setModifiedItems((_items) => {
        _items.push(item)
        return _items
      })
      setData((data) => {
        const newData = { ...data }
        newData.data.splice(
          data.data.findIndex(({ id }) => id === item.id),
          1,
          item,
        )
        return newData
      })
    }

    const contextValue = useMemo(() => ({ applyChanges, modifiedItems }), [])

    const Context = (DataViewerUpdateOperationContext as unknown) as React.Context<
      DataViewerUpdateOperationContextValue<InstanceType<ModelType>>
    >

    return (
      <Context.Provider value={contextValue}>
        <DataViewer
          {...(otherProps as Props)}
          DataItem={function DataItemWithUpdateOperation({
            onUpdate,
            ...otherProps
          }) {
            return (
              <DataItem
                onUpdate={(e, item) => {
                  if (onUpdate) {
                    onUpdate(e, item)
                  }
                  setSelectedItem(item)
                  if (formAction !== 'update') {
                    setFormAction('update')
                  }
                }}
                {...otherProps}
              />
            )
          }}
        />
        {selectedItem && formAction === 'update' && (
          <Alert onClose={() => setSelectedItem(undefined)}>
            <DynamicComponentLoading>
              <UpdateForm
                initialValues={selectedItem as InstanceType<ModelType>}
                onSuccess={(data) => {
                  applyChanges(data)
                  setSelectedItem(undefined)
                }}
                onCancel={() => setSelectedItem(undefined)}
              />
            </DynamicComponentLoading>
          </Alert>
        )}
      </Context.Provider>
    )
  }
}
