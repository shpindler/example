import { Btn } from '@/components/Btn'
import { Form, FormProps } from '@/components/Form'
import { Grid } from '@/components/Grid'
import { FormStatus } from '@/utils/form'
import cn from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './SimpleForm.module.scss'

export interface SimpleFormProps extends FormProps {
  submitBtnText?: string
  variant?: 'success' | 'danger'
  status?: string
  onCancel?: (e: React.SyntheticEvent) => void
}

export const SimpleForm: React.FC<
  SimpleFormProps & React.ComponentProps<'form'>
> = ({
  children,
  className,
  variant = 'success',
  submitBtnText = 'Сохранить',
  status = FormStatus.DEFAULT,
  onCancel,
  ...otherProps
}) => {
  const { t } = useTranslation()

  function _onCancel(e: React.SyntheticEvent): void {
    e.preventDefault()
    if (onCancel) {
      onCancel(e)
    }
  }

  return (
    <Form
      className={cn(style.SimpleForm, className)}
      status={status}
      {...otherProps}
    >
      {children}
      <Grid.Row className="mt-4" noGutters>
        {onCancel && (
          <Grid.Col className={style.SimpleForm__col}>
            <Btn variant="bordered" fluid onClick={_onCancel}>
              {t('Отмена')}
            </Btn>
          </Grid.Col>
        )}
        <Grid.Col className={style.SimpleForm__col}>
          <Btn
            type="submit"
            variant={variant}
            disabled={status === FormStatus.SUBMITTING}
            fluid
          >
            {t(submitBtnText)}
          </Btn>
        </Grid.Col>
      </Grid.Row>
    </Form>
  )
}
