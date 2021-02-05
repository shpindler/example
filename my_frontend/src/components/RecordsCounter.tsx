import { getParentWord } from '@/utils/linguistic'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface RecordsCounterProps {
  start?: number
  end?: number
  total?: number
  filteredTotal?: number
}

export const RecordsCounter: React.FC<RecordsCounterProps> = ({
  start = 0,
  end = 0,
  total = 0,
  filteredTotal,
  ...otherProps
}) => {
  const { t } = useTranslation()
  const _getParentWord = getParentWord.bind(null, [t('записи'), t('записей')])
  const actualTotal = filteredTotal === undefined ? total : filteredTotal
  return (
    <article {...otherProps}>
      {t('Записи')} {t('с')} {start} {t('до')} {end} {t('из')} {actualTotal}{' '}
      {_getParentWord(actualTotal)}{' '}
      {filteredTotal !== undefined &&
        `(отфильтровано из ${total} ${_getParentWord(total)})`}
    </article>
  )
}
