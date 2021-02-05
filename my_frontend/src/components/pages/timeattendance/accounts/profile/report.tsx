import { useGeneralParameters } from '@/api/general-parameters'
import { Alert } from '@/components/Alert'
import { Btn } from '@/components/Btn'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { timezones } from '@/components/Fields/Timezone'
import { workTimeCutOffFieldOptions } from '@/components/Fields/WorkTimeCutOff'
import { KeyValueDict } from '@/components/KeyValueDict'
import { Loading } from '@/components/Loading'
import { LoadingError } from '@/components/LoadingError'
import { getErrorText } from '@/utils/error'
import React, { useMemo, useState } from 'react'

const Form = React.lazy(() =>
  import('@/components/GeneralParametersForm').then((Module) => ({
    default: Module.GeneralParametersForm,
  })),
)

export const GeneralSettingsPage: React.FC = (props) => {
  const [showForm, setShowForm] = useState(false)
  const {
    data: generalParameters,
    isLoading: isParametersLoading,
    error: parametersError,
  } = useGeneralParameters()

  const items = useMemo(() => {
    if (!generalParameters || !timezones.length) {
      return []
    }
    const timezone = timezones.find(
      ({ value }) => value === generalParameters.timezone,
    )
    const workTimeCutOff = workTimeCutOffFieldOptions.find(
      ({ value }) => value === generalParameters.workTimeCutOff,
    )
    return [
      {
        key: 'Часовой пояс',
        value: timezone ? timezone.label : '',
      },
      {
        key: 'Не учитывать нарушения менее (мин)',
        value: generalParameters.violationDelta
          ? generalParameters.violationDelta.toString()
          : '',
      },
      {
        key: 'Контроль длительности отработанных смен',
        value: workTimeCutOff ? workTimeCutOff.label : '',
      },
      {
        key: 'Не учитывать смены без плана',
        value: generalParameters.workTimeCutOffNoPlan ? 'Да' : 'Нет',
      },
    ]
  }, [JSON.stringify(generalParameters), timezones.length])

  if (isParametersLoading) {
    return <Loading {...props} />
  } else if (parametersError || !generalParameters) {
    return <LoadingError message={getErrorText(parametersError)} />
  }

  const closeForm = () => setShowForm(false)

  return (
    <>
      <div className="fade">
        <KeyValueDict className="mb-5" items={items} />
        <Btn onClick={() => setShowForm(true)}>Редактировать</Btn>
      </div>
      {showForm && (
        <Alert onClose={closeForm}>
          <DynamicComponentLoading>
            <Form
              initialValues={generalParameters}
              onSuccess={closeForm}
              onCancel={closeForm}
            />
          </DynamicComponentLoading>
        </Alert>
      )}
    </>
  )
}
