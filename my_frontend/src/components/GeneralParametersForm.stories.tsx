import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  GeneralParametersForm,
  GeneralParametersFormProps,
} from './GeneralParametersForm'

export default {
  title: 'GeneralParametersForm',
  component: GeneralParametersForm,
  args: {
    initialValues: {
      timezone: 0,
      violationDelta: 10,
      workTimeCutOff: 2,
      workTimeCutNoPlan: true,
    },
  },
} as Meta

const Template: Story<GeneralParametersFormProps> = (args) => (
  <GeneralParametersForm {...args} />
)

export const Default = Template.bind({})
