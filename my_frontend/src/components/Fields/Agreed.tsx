import { CheckboxProps, FormikCheckbox } from '@/components/Checkbox'
import { List } from '@/components/List'
import { ListItem } from '@/components/ListItem'
import { SiteLink } from '@/components/SiteLink'
import React from 'react'

import style from './Agreed.module.scss'

export interface AgreedFieldProps extends Omit<CheckboxProps, 'name'> {
  name?: string
}

export const AgreedField: React.ForwardRefExoticComponent<AgreedFieldProps> = React.forwardRef(
  function AgreedField_(
    {
      name = 'agreed',
      label = 'Нажимая на кнопку «Оставить заявку», я:',
      ...otherProps
    },
    ref,
  ) {
    return (
      <FormikCheckbox ref={ref} name={name} label={label} {...otherProps}>
        <List className={style.Agreed__list} ordered>
          <ListItem className="my-2">
            Соглашаюсь с&nbsp;
            <SiteLink
              className={style.Agreed__link}
              href="/ofertapd"
              target="_blank"
              rel="noopener noreferrer"
            >
              политикой обработки персональных данных
            </SiteLink>
          </ListItem>
          <ListItem>
            Даю&nbsp;
            <SiteLink
              className={style.Agreed__link}
              href="/agreement"
              target="_blank"
              rel="noopener noreferrer"
            >
              письменное согласие на обработку своих персональных данных и
              получение бесплатной консультации
            </SiteLink>
          </ListItem>
        </List>
      </FormikCheckbox>
    )
  },
)
