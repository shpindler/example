import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { ViolationDeltaField, ViolationDeltaFieldProps } from './ViolationDelta'

export default {
  title: 'Fields/ViolationDelta',
  component: ViolationDeltaField,
} as Meta

const Template: Story<ViolationDeltaFieldProps> = (args) => (
  <Formik initialValues={{ violationdelta: 0 }} onSubmit={() => undefined}>
    <ViolationDeltaField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
