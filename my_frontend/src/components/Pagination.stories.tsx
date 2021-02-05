import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Pagination, PaginationProps } from './Pagination'

export default {
  title: 'Pagination',
  component: Pagination,
} as Meta

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
