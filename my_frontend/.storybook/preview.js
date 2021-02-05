import React from 'react'
import { addDecorator } from '@storybook/react'
import { withTests } from '@storybook/addon-jest'
import StoryRouter from 'storybook-react-router'

import { GeneralPermissionsContext } from '@/components/GeneralPermissions.context'
import { LayoutPermissionsContext } from
    '@/components/LayoutPermissions.context'
import { PagePermissionsContext } from
    '@/components/PagePermissions.context'
import '@/assets/scss/main.scss'
import { theme } from '@/utils/theme'
import results from '../.jest-test-results.json'


addDecorator(
  withTests({
    results,
  })
)

addDecorator(StoryRouter())

const root = new Proxy({}, {
  get: () => ({ readable: true, executable: true }),
})

addDecorator((Story) => (
  <GeneralPermissionsContext.Provider value={root}>
    <LayoutPermissionsContext.Provider value={root}>
      <PagePermissionsContext.Provider value={root}>
        <Story />
      </PagePermissionsContext.Provider>
    </LayoutPermissionsContext.Provider>
  </GeneralPermissionsContext.Provider>
))

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'idle',
    values: [
      { name: 'idle', value: theme.idle },
    ],
  },
  viewport: {
    viewports: [],
  },
}
