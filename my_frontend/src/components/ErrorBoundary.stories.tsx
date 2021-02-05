import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary'

export default {
  title: 'ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {
    fallback: {
      control: null,
    },
    withError: {
      control: 'boolean',
    },
  },
} as Meta

interface ComponentWithErrorProps {
  withError?: boolean
}

function ComponentWithError({
  withError = true,
}: ComponentWithErrorProps): JSX.Element {
  if (withError) {
    throw new Error('Unexpected error')
  }
  return <div>Expected content</div>
}

const Template: Story<ErrorBoundaryProps & ComponentWithErrorProps> = ({
  withError,
  ...args
}) => {
  return (
    <ErrorBoundary {...args}>
      <ComponentWithError withError={withError} />
    </ErrorBoundary>
  )
}

export const WithError = Template.bind({})
WithError.args = {
  withError: true,
}
export const WithoutError = Template.bind({})
WithoutError.args = {
  withError: false,
}
