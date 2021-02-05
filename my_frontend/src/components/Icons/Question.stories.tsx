import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { QuestionIcon, QuestionIconProps } from './Question'

export default {
  title: 'Icons/Question',
  component: QuestionIcon,
} as Meta

const Template: Story<QuestionIconProps> = (args) => <QuestionIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
