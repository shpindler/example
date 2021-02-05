import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Recommend, RecommendProps } from './Recommend'

export default {
  title: 'Recommend',
  component: Recommend,
} as Meta

const Template: Story<RecommendProps> = (args) => <Recommend {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
