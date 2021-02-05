/* eslint-disable */
// Only for dev purposes.

const express = require('express')
const cors = require('cors')
const test_api_server = express()
const port = 8081

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:6006', 'http://192.168.1.115'],
  credentials: true,
  preflightContinue: true,
}

test_api_server.options('/timeattendance/api/user', cors(corsOptions))
test_api_server.get('/timeattendance/api/user', cors(corsOptions), (req, res) => {
  res.json({
    username: 'arni2',
    timezoneOffset: 180,
  })
})

test_api_server.options('/timeattendance/api/timezones', cors(corsOptions))
test_api_server.get('/timeattendance/api/timezones', cors(corsOptions), (req, res) => {
  res.json({
    options: [
      { name: '(GMT+0000) GMT', value: 0 },
      { name: '(GMT+0300) Europe/Moscow', value: 180 },
    ],
  })
})

test_api_server.options('/timeattendance/api/settings/general-parameters', cors(corsOptions))
test_api_server.get(
  '/timeattendance/api/settings/general-parameters',
  cors(corsOptions),
  (req, res) => {
    res.json({
      timezone: 180,
      violationdelta: 10,
      worktimecutoff: 2,
      worktimecutnoplan: true,
    })
  },
)
test_api_server.post(
  '/timeattendance/api/settings/general-parameters',
  cors(corsOptions),
  (req, res) => {
    res.json()
  },
)

test_api_server.options('/timeattendance/api/general-permissions', cors(corsOptions))
test_api_server.get(
  '/timeattendance/api/general-permissions',
  cors(corsOptions),
  (req, res) => {
    res.json({
      "reports": { "readable": true, "executable": true },
    })
  },
)

test_api_server.options('/timeattendance/api/settings/permissions', cors(corsOptions))
test_api_server.get(
  '/timeattendance/api/settings/permissions',
  cors(corsOptions),
  (req, res) => {
    res.json({
      "general_parameters": { "readable": true, "executable": true },
      "position_dictionary": { "readable": true, "executable": true },
    })
  },
)

test_api_server.options('/timeattendance/api/positions', cors(corsOptions))
test_api_server.get('/timeattendance/api/positions', cors(corsOptions), (req, res) => {
  res.json({
    data: [
      { id: '1', name: 'Position 1', code: 'code 1' },
      { id: '2', name: 'Position 2', code: 'code 2' },
      { id: '3', name: 'Position 3', code: 'code 3' },
    ]
  })
})

test_api_server.options('/timeattendance/api/device-events', cors(corsOptions))
test_api_server.get('/timeattendance/api/device-events', cors(corsOptions), (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        employee: {
          name: 'Александр Шпиндлер',
        },
        office: {
          name: 'Купертино',
        },
        status: 51,
        mode: -1,
        event_date: '2020-10-10T09:00:00.000',
      },
     {
        id: 1,
        employee: {
          name: 'Александр Шпиндлер',
        },
        office: {
          name: 'Купертино',
        },
        status: 51,
        mode: -1,
        event_date: '2020-10-11T10:00:00.000',
      },
    ]
  })
})

test_api_server.options('/timeattendance/api/positions/permissions', cors(corsOptions))
test_api_server.get('/timeattendance/api/positions/permissions', cors(corsOptions), (req, res) => {
  res.json({
    "general_parameters": { "readable": true, "executable": true },
    "periodic_reports_parameters": { "readable": true, "executable": true },
    "employee_check_settings": { "readable": true, "executable": true },
    "notifications_parameters": { "readable": true, "executable": true },
    "additional_users": { "readable": true, "executable": true },
    "password_recovery_settings": { "readable": true, "executable": true },
    "audit_list": { "readable": true, "executable": true },
    "sms_history_list": { "readable": true, "executable": true },
    "employee_propagation": { "readable": true, "executable": true },
    "position_dictionary": { "readable": true, "executable": true },
  })
})

test_api_server.options('/timeattendance/api/reports/permissions', cors(corsOptions))
test_api_server.get('/timeattendance/api/reports/permissions', cors(corsOptions), (req, res) => {
  res.json({
    "report_list": { "readable": true, "executable": true },
    "report_wizard": { "readable": true, "executable": true },
  })
})

test_api_server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
