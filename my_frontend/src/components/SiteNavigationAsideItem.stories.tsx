import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  SiteNavigationAsideItem,
  SiteNavigationAsideItemProps,
} from './SiteNavigationAsideItem'

export default {
  title: 'SiteNavigationAsideItem',
  component: SiteNavigationAsideItem,
} as Meta

const Template: Story<SiteNavigationAsideItemProps> = (args) => (
  <SiteNavigationAsideItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'Ссылка',
  href: '/link',
}
Default.argTypes = {}
