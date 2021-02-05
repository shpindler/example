import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { IdCardIcon, IdCardIconProps } from './IdCard'

export default {
  title: 'Icons/IdCard',
  component: IdCardIcon,
} as Meta

const Template: Story<IdCardIconProps> = (args) => <IdCardIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
