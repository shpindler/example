import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { TimezoneField, TimezoneProps } from './Timezone'

export default {
  title: 'Fields/Timezone',
  component: TimezoneField,
} as Meta

const Template: Story<TimezoneProps> = (args) => (
  <Formik
    initialValues={{ timezone: 'Saint-Petersburg' }}
    onSubmit={() => undefined}
  >
    <TimezoneField {...args} />
  </Formik>
)

export const Default = Template.bind({})
