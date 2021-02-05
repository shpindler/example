import { updateDeviceEvent } from '@/api/device-events'
import {
  DataViewerContext,
  DataViewerContextValue,
} from '@/components/DataViewer/Context'
import { CreateUpdateFormProps } from '@/components/DataViewer/withCRUDOperations'
import { DateFromFilter } from '@/components/DataViewer/withDateFrom'
import { DateToFilter } from '@/components/DataViewer/withDateTo'
import { DataViewerDeleteOperationContext } from '@/components/DataViewer/withDeleteOperation'
import { DeviceEventCommentField } from '@/components/Fields/DeviceEventComment'
import { DeviceEventDateFieldProps } from '@/components/Fields/DeviceEventDate'
import { DeviceEventSkipFieldProps } from '@/components/Fields/DeviceEventSkip'
import {
  DeviceEventStatusFieldProps,
  deviceEventStatusValidation,
} from '@/components/Fields/DeviceEventStatus'
import { ObjectField } from '@/components/Fields/Object'
import { OfficeField } from '@/components/Fields/Office'
import {
  WorkCodeFieldProps,
  workCodeValidation,
} from '@/components/Fields/WorkCode'
import { GeneralPermissionsContext } from '@/components/GeneralPermissions.context'
import { Info } from '@/components/Info'
import { PagePermissionsContext } from '@/components/PagePermissions.context'
import { DeviceEventShortInfo } from '@/components/ShortInfo/DeviceEvent'
import { SimpleForm } from '@/components/SimpleForm'
import { Title } from '@/components/Title'
import { withPermissions } from '@/components/withPermissions'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { EmployeeSchedule } from '@/models/employee'
import { FormError } from '@/models/errors/form'
import { InfoMessage } from '@/models/info-message'
import { DeviceEventsPermissions } from '@/models/permissions/device-events'
import { DeviceEventDefaultProvider } from '@/providers/device-event'
import { difference } from '@/utils/difference'
import { onFormSubmit, useAppFormik } from '@/utils/form'
import { messages } from '@/utils/validators'
import { FormikProvider } from 'formik'
import { camelCase, capitalize } from 'lodash'
import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

import style from './DeviceEvent.module.scss'

let DeviceEvent: typeof DeviceEventType

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEvent = require(`@/plugins/user-specific/${window.userKey}/models/device-event`)[
    `${capitalize(camelCase(window.userKey))}DeviceEvent`
  ]
} catch {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEvent = require('@/models/device-event').DeviceEvent
}

export type DeviceEventFormProps = CreateUpdateFormProps<typeof DeviceEvent>

const DeviceEventDateFieldWithPermissions = withPermissions<
  'div',
  DeviceEventDateFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/DeviceEventDate').then((Module) => ({
      default: Module.DeviceEventDateField,
    })),
  ) as React.ComponentType<DeviceEventDateFieldProps>,
)
const DeviceEventStatusFieldWithPermissions = withPermissions<
  'div',
  DeviceEventStatusFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/DeviceEventStatus').then((Module) => ({
      default: Module.DeviceEventStatusField,
    })),
  ),
)
const DeviceEventSkipFieldWithPermissions = withPermissions<
  'div',
  DeviceEventSkipFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/DeviceEventSkip').then((Module) => ({
      default: Module.DeviceEventSkipField,
    })),
  ),
)
const WorkCodeFieldWithPermissions = withPermissions<'div', WorkCodeFieldProps>(
  React.lazy(() =>
    import('@/components/Fields/WorkCode').then((Module) => ({
      default: Module.WorkCodeField,
    })),
  ),
)

export const DeviceEventForm: React.FC<DeviceEventFormProps> = ({
  initialValues,
  onSuccess,
  ...otherProps
}) => {
  const generalPermissions = useContext(GeneralPermissionsContext)
  const deviceEventsPermissions = useContext(
    PagePermissionsContext,
  ) as DeviceEventsPermissions
  const ObjectOrOfficeField = generalPermissions.objects.executable
    ? ObjectField
    : OfficeField
  const [asyncError, setAsyncError] = useState('')
  const [info, setInfo] = useState<InfoMessage>()
  const formik = useAppFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      status: deviceEventStatusValidation.required(messages.required),
      workCode: workCodeValidation.required(messages.required),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await onFormSubmit({
          service: updateDeviceEvent,
          Model: DeviceEvent,
          values: {
            ...difference(
              values,
              (initialValues as unknown) as Record<string, unknown>,
            ),
            id: initialValues.id,
          },
          helpers,
          onSuccess,
        })
      } catch (error) {
        ;(error as FormError).show(setAsyncError, setInfo)
      }
    },
  })

  const nameRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  return (
    <FormikProvider value={formik}>
      <SimpleForm
        data-test-id="device-event-form"
        className={style.DeviceEventForm}
        status={formik.status}
        asyncError={asyncError}
        resetAsyncError={() => setAsyncError('')}
        {...otherProps}
      >
        <Title className="mb-4" level={4}>
          {initialValues.editable
            ? 'Редактировать отметку'
            : 'Информация об отметке'}
        </Title>
        <DeviceEventShortInfo
          className="mb-3"
          instance={initialValues}
          Provider={DeviceEventDefaultProvider}
        />
        {initialValues.editable && (
          <>
            {!initialValues.fixed && (
              <DeviceEventDateFieldWithPermissions
                className="mb-2"
                {...deviceEventsPermissions.management}
              />
            )}
            {initialValues.employee.schedule ===
              EmployeeSchedule.IN_OUT_CHECK && (
              <DeviceEventStatusFieldWithPermissions
                className="mb-2"
                {...deviceEventsPermissions.status}
              />
            )}
            {!initialValues.fixed && (
              <ObjectOrOfficeField
                queryParams={{
                  deviceEventId: formik.values.id || '',
                  employeeId: formik.values.employee
                    ? formik.values.employee.id
                    : '',
                  eventDate: formik.values.eventDate,
                }}
                className="mb-2"
                isOptionType
              />
            )}
            <WorkCodeFieldWithPermissions
              queryParams={{
                deviceEventId: formik.values.id,
                employeeId: formik.values.employee
                  ? formik.values.employee.id
                  : '',
                eventDate: formik.values.eventDate,
                officeId: formik.values.office && formik.values.office.id,
              }}
              className="mb-2"
              isOptionType
              {...generalPermissions.clients}
            />
            <DeviceEventCommentField className="mb-3" />
            <DeviceEventSkipFieldWithPermissions
              {...deviceEventsPermissions.skip}
            />
          </>
        )}
        {info && (
          <Info
            className="mt-3"
            type={info.type}
            header={info.title}
            content={info.description}
          />
        )}
      </SimpleForm>
    </FormikProvider>
  )
}

export function withUpdatingListOnSubmit(
  DeviceEventForm: React.FC<DeviceEventFormProps>,
): React.FC<DeviceEventFormProps> {
  return function DeviceEventFormWithUpdatingListOnSubmit({
    onSuccess,
    ...otherProps
  }) {
    const { applyRemoving } = useContext(DataViewerDeleteOperationContext)
    const { data, filters } = (useContext(
      DataViewerContext,
    ) as unknown) as DataViewerContextValue<
      DeviceEventType,
      DateFromFilter & DateToFilter
    >

    function withRespectForFilters(
      item: DeviceEventType,
      { dateFrom, dateTo }: DateFromFilter & DateToFilter,
    ): boolean {
      return item.eventDate >= dateFrom && item.eventDate <= dateTo
    }

    return (
      <DeviceEventForm
        {...otherProps}
        onSuccess={async (item, helpers, updatedData) => {
          if (onSuccess) {
            await onSuccess(item, helpers, updatedData)
          }
          if (
            'eventDate' in updatedData &&
            filters &&
            filters.dateFrom !== undefined &&
            filters.dateTo !== undefined &&
            !withRespectForFilters(
              item,
              filters as DateFromFilter & DateToFilter,
            )
          ) {
            applyRemoving(item, data)
          }
        }}
      />
    )
  }
}
