// Must be use after all specific operations HOC's. For instance:
// const DataViewer = withCRUDOperations(withDeleteOperation(DataViewerLayout))
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import { FormAction, FormProps } from '@/types/form'
import React, { useState } from 'react'

export type CreateUpdateFormProps<
  ModelType extends typeof BaseModel
> = FormProps<ModelType>

export interface DataViewerCRUDOperationsContextValue<
  Model extends BaseModel = BaseModel
> {
  selectedItem?: Model
  setSelectedItem: StateSetter<Model | undefined>
  formAction: FormAction
  setFormAction: StateSetter<FormAction>
}

export const DataViewerCRUDOperationsContext = React.createContext<
  DataViewerCRUDOperationsContextValue
>({} as DataViewerCRUDOperationsContextValue)

export function DataViewerCRUDOperationsProvider<
  ModelType extends typeof BaseModel
>({ children }: React.PropsWithChildren<unknown>): JSX.Element {
  const [formAction, setFormAction] = useState<FormAction>('create')
  const [selectedItem, setSelectedItem] = useState<
    InstanceType<ModelType> | undefined
  >(undefined)

  const Context = (DataViewerCRUDOperationsContext as unknown) as React.Context<
    DataViewerCRUDOperationsContextValue<InstanceType<ModelType>>
  >

  return (
    <Context.Provider
      value={{
        selectedItem,
        setSelectedItem,
        formAction,
        setFormAction,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function withCRUDOperations<Props>(
  DataViewer: React.ComponentType<Props>,
): React.FC<Props> {
  return function DataViewerWithCRUDOperations(props) {
    return (
      <DataViewerCRUDOperationsProvider>
        <DataViewer {...props} />
      </DataViewerCRUDOperationsProvider>
    )
  }
}
