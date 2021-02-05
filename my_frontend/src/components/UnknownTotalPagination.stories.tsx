import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  UnknownTotalPagination,
  UnknownTotalPaginationProps,
} from './UnknownTotalPagination'

export default {
  title: 'UnknownTotalPagination',
  component: UnknownTotalPagination,
} as Meta

const Template: Story<UnknownTotalPaginationProps> = (args) => (
  <UnknownTotalPagination {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}

export const WithNextPage = Template.bind({})
WithNextPage.args = {
  hasNextPage: true,
}

export const WithPreviousPage = Template.bind({})
WithPreviousPage.args = {
  page: 5,
}

export const WithNextAndPreviousPages = Template.bind({})
WithNextAndPreviousPages.args = {
  hasNextPage: true,
  page: 5,
}
