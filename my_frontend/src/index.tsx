import '@babel/polyfill'

import { SWRConfigValue } from '@/utils/swr.config'
import React from 'react'
import ReactDOM from 'react-dom'
import { SWRConfig } from 'swr'

import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={SWRConfigValue}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root'),
)
