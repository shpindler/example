import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SiteFooter, SiteFooterProps } from './SiteFooter'

export default {
  title: 'SiteFooter',
  component: SiteFooter,
} as Meta

const Template: Story<SiteFooterProps> = (args) => <SiteFooter {...args} />

export const Default = Template.bind({})
