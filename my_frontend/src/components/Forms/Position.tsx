import { createPosition, updatePosition } from '@/api/positions'
import { CreateUpdateFormProps } from '@/components/DataViewer/withCRUDOperations'
import { AlternateNameFieldProps } from '@/components/Fields/AlternateName'
import { GroupNameFieldProps } from '@/components/Fields/GroupName'
import { GroupOfPositionsFieldProps } from '@/components/Fields/GroupOfPositions'
import {
  PositionCodeField,
  PositionCodeValidationSchema,
} from '@/components/Fields/PositionCode'
import {
  PositionNameField,
  PositionNameValidationSchema,
} from '@/components/Fields/PositionName'
import {
  PositionRateFieldProps,
  PositionRateValidationSchema,
} from '@/components/Fields/PositionRate'
import { UseInBidFieldProps } from '@/components/Fields/UseInBid'
import { PagePermissionsContext } from '@/components/PagePermissions.context'
import { SimpleForm } from '@/components/SimpleForm'
import { Title } from '@/components/Title'
import { withPermissions } from '@/components/withPermissions'
import { FormError } from '@/models/errors/form'
import { Position } from '@/models/position'
import { onFormSubmit, useAppFormik } from '@/utils/form'
import { messages } from '@/utils/validators'
import { FormikProvider } from 'formik'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export type PositionFormProps = CreateUpdateFormProps<typeof Position>

const AlternateNameFieldWithPermissions = withPermissions<
  'div',
  AlternateNameFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/AlternateName').then((Module) => ({
      default: Module.AlternateNameField,
    })),
  ),
)

const PositionRateFieldWithPermissions = withPermissions<
  'div',
  PositionRateFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/PositionRate').then((Module) => ({
      default: Module.PositionRateField,
    })),
  ),
)

const GroupOfPositionsFieldWithPermissions = withPermissions<
  'div',
  GroupOfPositionsFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/GroupOfPositions').then((Module) => ({
      default: Module.GroupOfPositionsField,
    })),
  ),
)

const GroupNameFieldWithPermissions = withPermissions<
  'div',
  GroupNameFieldProps
>(
  React.lazy(() =>
    import('@/components/Fields/GroupName').then((Module) => ({
      default: Module.GroupNameField,
    })),
  ),
)

const UseInBidFieldWithPermissions = withPermissions<'div', UseInBidFieldProps>(
  React.lazy(() =>
    import('@/components/Fields/UseInBid').then((Module) => ({
      default: Module.UseInBidField,
    })),
  ),
)

export const PositionForm: React.FC<PositionFormProps> = ({
  initialValues,
  onSuccess,
  action,
  ...otherProps
}) => {
  const { t } = useTranslation()
  const [asyncError, setAsyncError] = useState('')
  const service = useMemo(() => {
    switch (action) {
      case 'create':
        return createPosition
      case 'update':
        return updatePosition
    }
    throw new Error(`Incorrect formAction - ${action}.`)
  }, [action])
  const formik = useAppFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: PositionNameValidationSchema.required(messages.required),
      externalCode: PositionCodeValidationSchema,
      rate: PositionRateValidationSchema,
    }),
    onSubmit: async (values, helpers) => {
      try {
        await onFormSubmit({
          service,
          Model: Position,
          values,
          helpers,
          onSuccess,
        })
      } catch (error) {
        ;(error as FormError).show(setAsyncError)
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
    <PagePermissionsContext.Consumer>
      {(permissions) => (
        <FormikProvider value={formik}>
          <SimpleForm
            data-test-id="position-form"
            status={formik.status}
            asyncError={asyncError}
            resetAsyncError={() => setAsyncError('')}
            {...otherProps}
          >
            <Title level={3} className="mb-4">
              {t('Должность')}
            </Title>
            <PositionNameField ref={nameRef} className="mb-3" required />
            <PositionCodeField className="mb-3" />
            <PositionRateFieldWithPermissions
              className="mb-3"
              {...permissions.rate}
            />
            <GroupOfPositionsFieldWithPermissions
              className="mb-3"
              {...permissions.groupOfPositions}
            />
            <GroupNameFieldWithPermissions
              className="mb-3"
              {...permissions.groupName}
            />
            <AlternateNameFieldWithPermissions
              className="mb-3"
              {...permissions.alternateName}
            />
            <UseInBidFieldWithPermissions {...permissions.useInBid} />
          </SimpleForm>
        </FormikProvider>
      )}
    </PagePermissionsContext.Consumer>
  )
}
