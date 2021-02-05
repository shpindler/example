import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { FileIcon, FileIconProps } from './File'

export default {
  title: 'Icons/File',
  component: FileIcon,
} as Meta

const Template: Story<FileIconProps> = (args) => <FileIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
