import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { KeyValueDict, KeyValueDictProps } from './KeyValueDict'

export default {
  title: 'KeyValueDict',
  component: KeyValueDict,
} as Meta

const Template: Story<KeyValueDictProps> = (args) => <KeyValueDict {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [
    { key: 'Key 1', value: 'Value 1' },
    { key: 'Key without value' },
    { key: 'Key 3', value: 'Value 3' },
  ],
}
Default.argTypes = {}
