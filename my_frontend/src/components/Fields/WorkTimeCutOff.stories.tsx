import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { WorkTimeCutOffField, WorkTimeCutOffFieldProps } from './WorkTimeCutOff'

export default {
  title: 'Fields/WorkTimeCutOff',
  component: WorkTimeCutOffField,
} as Meta

const Template: Story<WorkTimeCutOffFieldProps> = (args) => (
  <Formik initialValues={{ worktimecutoff: 0 }} onSubmit={() => undefined}>
    <WorkTimeCutOffField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
