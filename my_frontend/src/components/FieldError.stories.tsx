import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { FieldError, FieldErrorProps } from './FieldError'

export default {
  title: 'FieldError',
  component: FieldError,
} as Meta

const Template: Story<FieldErrorProps> = (args) => (
  <div style={{ position: 'relative' }}>
    <FieldError {...args}>Ошибка</FieldError>
  </div>
)

export const Default = Template.bind({})
