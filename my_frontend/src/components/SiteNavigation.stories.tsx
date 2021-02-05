import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SiteNavigation, SiteNavigationProps } from './SiteNavigation'

export default {
  title: 'SiteNavigation',
  component: SiteNavigation,
} as Meta

const Template: Story<SiteNavigationProps> = (args) => (
  <SiteNavigation {...args} />
)

export const Default = Template.bind({})
