import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { RecordsCounter, RecordsCounterProps } from './RecordsCounter'

export default {
  title: 'RecordsCounter',
  component: RecordsCounter,
} as Meta

const Template: Story<RecordsCounterProps> = (args) => (
  <RecordsCounter {...args} />
)

export const Default = Template.bind({})
export const WithoutFiltered = Template.bind(
  {},
  {
    start: 1,
    end: 100,
    total: 1000,
  },
)
export const WithFiltered = Template.bind(
  {},
  {
    start: 1,
    end: 100,
    total: 1000,
    filteredTotal: 500,
  },
)
