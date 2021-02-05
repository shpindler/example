import { Meta, Story } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import React from 'react'

import { PageSizeField, PageSizeFieldProps } from './PageSize'

export default {
  title: 'Fields/PageSize',
  component: PageSizeField,
} as Meta

const Template: Story<PageSizeFieldProps> = (args) => (
  <Formik initialValues={{ pageSize: 10 }} onSubmit={() => undefined}>
    <PageSizeField {...args} />
  </Formik>
)

export const Default = Template.bind({})
