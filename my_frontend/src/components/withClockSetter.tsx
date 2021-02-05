import React, { JSXElementConstructor, useEffect, useState } from 'react'

export interface withClockSetterProps {
  startDate?: Date
  timestamp?: number
  interval?: number
}

type Constraint = { date: Date }

export function withClockSetter<
  Element extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  Props extends Constraint
>(Clock: React.ComponentType<Props>) {
  return React.forwardRef<
    Element,
    Omit<Props, keyof Constraint> & withClockSetterProps
  >(function ClockSetter(
    { startDate, timestamp, interval = 60000, ...otherProps },
    ref,
  ) {
    const [date, setDate] = useState(
      startDate || (timestamp ? new Date(timestamp) : new Date()),
    )

    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date(date.getTime() + interval))
      }, interval)
      return () => clearInterval(timer)
    }, [startDate, timestamp, interval])

    return <Clock {...(otherProps as Props)} ref={ref} date={date} />
  })
}
