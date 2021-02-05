import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  SiteNavigationItem,
  SiteNavigationItemProps,
} from './SiteNavigationItem'

export default {
  title: 'SiteNavigationItem',
  component: SiteNavigationItem,
} as Meta

const Template: Story<SiteNavigationItemProps> = (args) => (
  <SiteNavigationItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'Ссылка',
  href: '/link',
}
export const Active = Template.bind({})
Active.args = {
  name: 'Ссылка',
  href: '/link',
  className: 'active',
}
export const Highlighted = Template.bind({})
Highlighted.args = {
  name: 'Ссылка',
  href: '/link',
  highlighted: true,
}
export const ActiveAndHighlighted = Template.bind({})
ActiveAndHighlighted.args = {
  name: 'Ссылка',
  href: '/link',
  className: 'active',
  highlighted: true,
}
