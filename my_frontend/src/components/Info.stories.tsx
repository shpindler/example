import { LoadingError } from '@/components/LoadingError'
import { PermissionDenied } from '@/components/PermissionDenied'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Info, InfoProps } from './Info'

export default {
  title: 'Info',
  component: Info,
} as Meta

const PermissionDeniedTemplate: Story<InfoProps> = (args) => {
  return <PermissionDenied {...args} />
}
const LoadingErrorTemplate: Story<InfoProps> = (args) => {
  return <LoadingError {...args} />
}

export const PermissionDeniedComponent = PermissionDeniedTemplate.bind({})
export const LoadingErrorComponent = LoadingErrorTemplate.bind({})
