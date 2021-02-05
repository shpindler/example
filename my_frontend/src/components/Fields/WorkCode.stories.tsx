import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { WorkCodeField, WorkCodeFieldProps } from './WorkCode'

export default {
  title: 'Fields/WorkCode',
  component: WorkCodeField,
} as Meta

const Template: Story<WorkCodeFieldProps> = (args) => (
  <Formik initialValues={{ label: '', value: -1 }} onSubmit={() => undefined}>
    <WorkCodeField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
