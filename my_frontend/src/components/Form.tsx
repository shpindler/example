// Usage: see https://formik.org/docs/api/form (requires <Formik /> wrapper).
import { AsyncError } from '@/components/AsyncError'
import { Overlay } from '@/components/Overlay'
import { APPEARING_ANIMATION_DURATION } from '@/utils/constants'
import { FormStatus } from '@/utils/form'
import { Form as FormikForm } from 'formik'
import React, { useEffect, useState } from 'react'

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  status?: string
  asyncError?: string
  resetAsyncError?: () => void
}

function isSubmitBtnFocused() {
  const activeElement = document.activeElement as HTMLButtonElement | undefined
  return activeElement && activeElement.type === 'submit'
}

export const Form: React.FC<FormProps> = ({
  autoComplete = 'off',
  children,
  noValidate = true,
  status = FormStatus.DEFAULT,
  asyncError = '',
  resetAsyncError,
  ...otherProps
}) => {
  function onKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'Enter' && !isSubmitBtnFocused()) {
      e.preventDefault()
    }
  }

  const [interfaceDisabled, setInterfaceDisabled] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (status === FormStatus.SUBMITTING) {
      setInterfaceDisabled(true)
    } else {
      timer = setTimeout(
        () => setInterfaceDisabled(false),
        APPEARING_ANIMATION_DURATION,
      )
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [status])

  return (
    <>
      <FormikForm
        autoComplete={autoComplete}
        noValidate={noValidate}
        onKeyDown={onKeyDown}
        {...otherProps}
      >
        {children}
      </FormikForm>
      {interfaceDisabled && <Overlay transparent />}
      {asyncError && resetAsyncError && (
        <AsyncError message={asyncError} onClose={resetAsyncError} />
      )}
    </>
  )
}
