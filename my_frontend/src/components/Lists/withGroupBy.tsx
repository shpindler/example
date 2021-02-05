import { CompleteListProps } from '@/components/Lists/CompleteList'
import { BaseModel } from '@/models/base'
import { isEqual } from 'lodash'
import React from 'react'

export interface withGroupByProps<
  Model extends BaseModel,
  Group extends Model[keyof Model]
> extends Pick<CompleteListProps<Model>, 'items' | 'renderItem'> {
  groupBy: keyof Model
  renderGroupSeparator: (group: Group, idx: number) => JSX.Element
  areGroupsEqual?: (group1: Group, group2: Group) => boolean
}

export function withGroupBy<
  Group extends Model[keyof Model],
  Model extends BaseModel,
  Props extends CompleteListProps<Model>
>(
  CompleteList: React.ComponentType<Props>,
): React.FC<Props & withGroupByProps<Model, Group>> {
  return function CompleteListWithGroupBy({
    groupBy,
    renderGroupSeparator,
    renderItem,
    areGroupsEqual = isEqual,
    items = [],
    ...otherProps
  }) {
    const groups: Model[][] = []
    items.forEach((item, idx, items) => {
      const currentGroup = item[groupBy] as Group
      const previousGroup =
        idx > 0 ? (items[idx - 1][groupBy] as Group) : undefined
      if (
        previousGroup === undefined ||
        !areGroupsEqual(previousGroup, currentGroup)
      ) {
        groups.push([item])
      } else {
        groups[groups.length - 1].push(item)
      }
    })
    const itemsToShow = groups.map((groupItems, idx) => {
      return (
        <div key={`group-${idx}`}>
          {renderGroupSeparator(groupItems[0][groupBy] as Group, idx)}
          {groupItems.map(renderItem)}
        </div>
      )
    })
    return (
      <CompleteList
        {...(otherProps as Props)}
        items={items}
        itemsToShow={itemsToShow}
      />
    )
  }
}
