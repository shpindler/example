import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ExcelBtn, ExcelBtnProps } from './ExcelBtn'

export default {
  title: 'ExcelBtn',
  component: ExcelBtn,
} as Meta

const Template: Story<ExcelBtnProps> = (args) => <ExcelBtn {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
