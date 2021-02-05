import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DownloadIcon, DownloadIconProps } from './Download'

export default {
  title: 'Icons/Download',
  component: DownloadIcon,
} as Meta

const Template: Story<DownloadIconProps> = (args) => <DownloadIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
