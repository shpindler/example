import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SpinnerIcon, SpinnerIconProps } from './Spinner'

export default {
  title: 'Icons/Spinner',
  component: SpinnerIcon,
} as Meta

const Template: Story<SpinnerIconProps> = (args) => <SpinnerIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
