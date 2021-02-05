import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Btn, BtnProps } from './Btn'

export default {
  title: 'Btn',
  component: Btn,
} as Meta

const Template: Story<BtnProps> = (args) => <Btn {...args}>Кнопка</Btn>

export const Default = Template.bind({})
export const Bordered = Template.bind({}, { variant: 'bordered' })
export const Danger = Template.bind({}, { variant: 'danger' })
export const Gray = Template.bind({}, { variant: 'gray' })
export const Success = Template.bind({}, { variant: 'success' })
export const Public = Template.bind({}, { variant: 'public' })
export const Transparent = Template.bind({}, { variant: 'transparent' })
