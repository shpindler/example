import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import {
  WorkTimeCutOffNoPlanField,
  WorkTimeCutOffNoPlanFieldProps,
} from './WorkTimeCutOffNoPlan'

export default {
  title: 'Fields/WorkTimeCutOffNoPlanField',
  component: WorkTimeCutOffNoPlanField,
} as Meta

const Template: Story<WorkTimeCutOffNoPlanFieldProps> = (args) => (
  <Formik
    initialValues={{ workTimeCutOffNoPlan: true }}
    onSubmit={() => undefined}
  >
    <WorkTimeCutOffNoPlanField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
