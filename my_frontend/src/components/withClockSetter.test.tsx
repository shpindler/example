import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { withClockSetter } from './withClockSetter'

describe('withClockSetter', () => {
  test('every interval updates date by interval.', async () => {
    const resultTestId = 'result'
    const Clock = withClockSetter(({ date }) => {
      return (
        <div data-testid={resultTestId}>
          {date.toLocaleTimeString('ru', { minute: 'numeric' })}
        </div>
      )
    })
    const startDate = new Date(1993, 6, 18, 0, 0, 59, 900)
    render(<Clock startDate={startDate} interval={100} />)
    const result = screen.getByTestId(resultTestId)
    expect(result.textContent).toBe('0')
    await waitFor(() => expect(result.textContent).toBe('1'))
  })
})
