import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Loading, LoadingProps } from './Loading'

export default {
  title: 'Loading',
  component: Loading,
} as Meta

const Template: Story<LoadingProps> = (args) => <Loading {...args} />

export const Default = Template.bind({})
