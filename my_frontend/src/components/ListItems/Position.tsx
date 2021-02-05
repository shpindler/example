import { DataItemProps } from '@/components/DataViewer'
import { ListItem } from '@/components/ListItem'
import { Text } from '@/components/Text'
import { Position as PositionModel } from '@/models/position'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import style from './Position.module.scss'

export interface PositionProps extends DataItemProps<PositionModel> {}

export const PositionItem: React.FC<PositionProps> = ({
  item,
  onDelete,
  onUpdate,
  ...otherProps
}) => {
  return (
    <ListItem
      data-test-id={`position-${item.id}`}
      className={style.Position}
      onClick={onUpdate && ((e) => onUpdate(e, item))}
      interactive
      {...otherProps}
    >
      <Text className={style.Position__text} lines={1} width={530}>
        {item.name}
      </Text>
      <section
        data-test-id="delete-btn"
        role="button"
        tabIndex={0}
        className={style.Position__delete}
        onClick={onDelete && ((e) => onDelete(e, item))}
        onKeyPress={
          onDelete &&
          ((e) => {
            if (e.key === 'Enter') {
              onDelete(e, item)
            }
          })
        }
      >
        <AiOutlineDelete className={style.Position__icon} />
      </section>
    </ListItem>
  )
}
