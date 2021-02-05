import { DownloadIcon } from '@/components/Icons/Download'
import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './ExcelBtn.module.scss'

export interface ExcelBtnProps extends React.ComponentProps<'a'> {}

export const ExcelBtn: React.FC<ExcelBtnProps> = (props) => {
  const { t } = useTranslation()

  return (
    <a data-test-id="excel-btn" className={style.ExcelBtn} {...props}>
      <DownloadIcon className={style.ExcelBtn__icon} />
      {t('Скачать в Excel')}
    </a>
  )
}
