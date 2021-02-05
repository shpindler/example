import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { FaceIcon, FaceIconProps } from './Face'

export default {
  title: 'Icons/Face',
  component: FaceIcon,
} as Meta

const Template: Story<FaceIconProps> = (args) => <FaceIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
