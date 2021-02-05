import React from 'react'

import style from './ClockDisplay.module.scss'

export interface ClockDisplayProps {
  date: Date
  timestamp?: number
}

const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  date,
  timestamp,
}) => {
  const _date = date || (timestamp ? new Date(timestamp) : new Date())
  return (
    <article className={style.ClockDisplay}>
      <section>
        {_date.getDate()} {months[_date.getMonth()]} {_date.getFullYear()}
      </section>
      <section>
        {_date.toLocaleTimeString('ru', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </section>
    </article>
  )
}
