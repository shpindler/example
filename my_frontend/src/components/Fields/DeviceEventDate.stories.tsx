import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import {
  DeviceEventDateField,
  DeviceEventDateFieldProps,
} from './DeviceEventDate'

export default {
  title: 'Fields/DeviceEventDate',
  component: DeviceEventDateField,
} as Meta

const Template: Story<DeviceEventDateFieldProps> = (args) => (
  <Formik initialValues={{ eventDate: new Date() }} onSubmit={() => undefined}>
    <DeviceEventDateField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
