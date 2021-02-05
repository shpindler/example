import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { UseInBidField, UseInBidFieldProps } from './UseInBid'

export default {
  title: 'Fields/UseInBid',
  component: UseInBidField,
} as Meta

const Template: Story<UseInBidFieldProps> = (args) => (
  <UseInBidField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
