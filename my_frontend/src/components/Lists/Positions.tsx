import { getPositionsList } from '@/api/positions'
import { DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList } from '@/components/DataViewer/Implementations/CRUD_ExcelBtn_Search_PageSize_CompleteList'
import { PositionItem } from '@/components/ListItems/Position'
import { Position as PositionModel } from '@/models/position'
import React from 'react'
import { useTranslation } from 'react-i18next'

const PositionForm = React.lazy(() =>
  import('@/components/Forms/Position').then((Module) => ({
    default: Module.PositionForm,
  })),
)
const RemovePositionConfirmation = React.lazy(() =>
  import('@/components/RemoveConfirmations/Position').then((Module) => ({
    default: Module.RemovePositionConfirmation,
  })),
)

export const PositionsList: React.FC = (props) => {
  const { t } = useTranslation()
  return (
    <DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList
      ItemModel={PositionModel}
      DataItem={PositionItem}
      CreateForm={function CreatePositionForm(props) {
        return <PositionForm action="create" {...props} />
      }}
      DeleteForm={RemovePositionConfirmation}
      UpdateForm={function UpdatePositionForm(props) {
        return <PositionForm action="update" {...props} />
      }}
      ListHeader={<>{t('Должность')}</>}
      getList={getPositionsList}
      addBtnText="Добавить должность"
      {...props}
    />
  )
}
