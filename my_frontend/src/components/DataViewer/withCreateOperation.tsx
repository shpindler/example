// Must be use together with withCRUDOperations HOC.
import { Alert } from '@/components/Alert'
import { Btn } from '@/components/Btn'
import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import {
  CreateUpdateFormProps,
  DataViewerCRUDOperationsContext,
} from '@/components/DataViewer/withCRUDOperations'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export interface withCreateOperationProps<ModelType extends typeof BaseModel> {
  addBtnText?: string
  CreateForm: React.ComponentType<CreateUpdateFormProps<ModelType>>
}

export function withCreateOperation<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(
  DataViewer: React.ComponentType<Props>,
): React.FC<Props & withCreateOperationProps<ModelType>> {
  return function DataViewerWithCreateOperation({
    before,
    addBtnText = '',
    ItemModel,
    CreateForm,
    ...otherProps
  }) {
    const { t } = useTranslation()
    const { data, setData } = useContext(DataViewerContext)
    const {
      selectedItem,
      setSelectedItem,
      formAction,
      setFormAction,
    } = useContext(DataViewerCRUDOperationsContext)

    function onSuccess(item: InstanceType<ModelType>) {
      if (data.data.length) {
        data.data.unshift(item)
      }
      if (data.data.length > 10) {
        data.data.pop()
      }
      if (data.total !== undefined) {
        data.total++
      }
      setData(data)
      setSelectedItem(undefined)
    }

    return (
      <>
        <DataViewer
          {...(otherProps as Props)}
          before={
            <>
              <Grid.Col xs="auto">
                <Btn
                  data-test-id="add-item"
                  onClick={() => {
                    setSelectedItem(new ItemModel())
                    if (formAction !== 'create') {
                      setFormAction('create')
                    }
                  }}
                >
                  +&nbsp;&nbsp;&nbsp;{t(addBtnText)}
                </Btn>
              </Grid.Col>
              {before}
            </>
          }
          ItemModel={ItemModel}
        />
        {selectedItem && formAction === 'create' && (
          <Alert onClose={() => setSelectedItem(undefined)}>
            <DynamicComponentLoading>
              <CreateForm
                initialValues={selectedItem as InstanceType<ModelType>}
                onSuccess={onSuccess}
                onCancel={() => setSelectedItem(undefined)}
              />
            </DynamicComponentLoading>
          </Alert>
        )}
      </>
    )
  }
}
