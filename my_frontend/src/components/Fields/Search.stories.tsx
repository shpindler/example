import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { SearchField, SearchFieldProps } from './Search'

export default {
  title: 'Fields/Search',
  component: SearchField,
} as Meta

const Template: Story<SearchFieldProps> = (args) => (
  <Formik initialValues={{ search: '' }} onSubmit={() => undefined}>
    <SearchField {...args} />
  </Formik>
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
