import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SiteHeader, SiteHeaderProps } from './SiteHeader'

export default {
  title: 'SiteHeader',
  component: SiteHeader,
} as Meta

const Template: Story<SiteHeaderProps> = (args) => {
  return <SiteHeader {...args} />
}

export const Default = Template.bind({})
