import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SettingsAsideMenu, SettingsAsideMenuProps } from './SettingsAsideMenu'

export default {
  title: 'AsideMenu',
  component: SettingsAsideMenu,
} as Meta

const Template: Story<SettingsAsideMenuProps> = (args) => (
  <SettingsAsideMenu {...args} />
)

export const Default = Template.bind({})
