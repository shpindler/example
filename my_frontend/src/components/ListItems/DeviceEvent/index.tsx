import { DataItemProps } from '@/components/DataViewer'
import { Grid } from '@/components/Grid'
import { CheckIcon } from '@/components/Icons/Check'
import { CrossIcon } from '@/components/Icons/Cross'
import { DotsIcon } from '@/components/Icons/Dots'
import { Image } from '@/components/Image'
import { ListItem, ListItemProps } from '@/components/ListItem'
import { DeviceEventActionListProps } from '@/components/ListItems/DeviceEvent/ActionList'
import { Popover } from '@/components/Popover'
import { Text } from '@/components/Text'
import { UserContext } from '@/components/User.context'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { DeviceEventDefaultProvider } from '@/providers/device-event'
import cn from 'classnames'
import { camelCase, capitalize } from 'lodash'
import React, { useContext, useEffect, useRef, useState } from 'react'

import style from './index.module.scss'

let DeviceEventActionList: React.ComponentType<DeviceEventActionListProps>

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEventActionList = require(`@/plugins/user-specific/${window.userKey}/components/ListItems/DeviceEvent/ActionList`)[
    `${capitalize(camelCase(window.userKey))}DeviceEventActionList`
  ]
} catch {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEventActionList = require('@/components/ListItems/DeviceEvent/ActionList')
    .DeviceEventActionList
}

export interface DeviceEventProps
  extends Omit<DataItemProps<DeviceEventType>, 'onDelete' | 'onUpdate'>,
    Required<Pick<DataItemProps<DeviceEventType>, 'onDelete' | 'onUpdate'>>,
    ListItemProps {}

export const DeviceEventItem: React.FC<DeviceEventProps> = ({
  item,
  className,
  onDelete,
  onUpdate,
  ...otherProps
}) => {
  const Provider = new DeviceEventDefaultProvider({ instance: item })
  const user = useContext(UserContext)
  const [showPopover, setShowPopover] = useState(false)
  const [popoverTop, setPopoverTop] = useState(0)
  const [popoverLeft, setPopoverLeft] = useState(0)
  const popoverRef = useRef<HTMLElement>(null)
  const additionalRef = useRef<HTMLDivElement>(null)

  function onClickOutsidePopover(e: MouseEvent): void {
    if (
      additionalRef.current &&
      !e.composedPath().includes(additionalRef.current)
    ) {
      setShowPopover(false)
    }
  }

  useEffect(() => {
    addEventListener('click', onClickOutsidePopover)
    return () => {
      removeEventListener('click', onClickOutsidePopover)
    }
  })

  function _onUpdate(e: React.SyntheticEvent): void {
    if (onUpdate) {
      onUpdate(e, item)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      _onUpdate(e)
    }
  }

  return (
    <ListItem
      data-test-id={`device-event-${item.id}`}
      className={cn(style.DeviceEvent, className)}
      interactive
      {...otherProps}
    >
      <Grid.Row className={style.DeviceEvent__row}>
        <Grid.Col
          xs={1}
          className={cn(
            style.DeviceEvent__col,
            style.DeviceEvent__imageWrapper,
          )}
          onClick={_onUpdate}
        >
          <Image
            src={item.image || Provider.imageStatusIcon}
            alt={Provider.imageStatusText}
            title={Provider.imageStatusText}
            contain
          />
        </Grid.Col>
        <Grid.Col xs={3} className={style.DeviceEvent__col} onClick={_onUpdate}>
          <Text lines={1} width={140}>
            {item.employee.name}
          </Text>
          <Text className={style.DeviceEvent__latestChange} isHelp>
            {item.description.lastEditedBy} {item.description.lastEdited}
          </Text>
        </Grid.Col>
        <Grid.Col xs={2} className={style.DeviceEvent__col} onClick={_onUpdate}>
          <Text lines={3} width={80}>
            {item.office.name}
          </Text>
        </Grid.Col>
        <Grid.Col
          xs={2}
          className={cn(style.DeviceEvent__col, style.DeviceEvent__col_status)}
          onClick={_onUpdate}
        >
          <Text>{Provider.statusText}</Text>
          <Text isHelp>{item.workCode.name}</Text>
        </Grid.Col>
        <Grid.Col
          xs={1}
          className={cn(style.DeviceEvent__col, style.DeviceEvent__col_time)}
          onClick={_onUpdate}
        >
          <Text>
            {item.eventDate.toLocaleTimeString('ru', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
          {item.office.timezone !== user.profile.timezone &&
            item.moscowTimezoneOffset !== 0 && (
              <Text isHelp>
                (МСК
                {item.moscowTimezoneOffset / 60})
              </Text>
            )}
        </Grid.Col>
        <Grid.Col
          className={cn(style.DeviceEvent__col, style.DeviceEvent__col_icons)}
        >
          <div
            role="button"
            tabIndex={0}
            className={style.DeviceEvent__iconWrapper}
            onClick={_onUpdate}
            onKeyDown={onKeyDown}
          >
            <Provider.ModeIcon
              className={style.DeviceEvent__icon}
              title={Provider.modeText}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className={style.DeviceEvent__iconWrapper}
            title={item.skip ? 'Не учитывать отметку' : 'Учитывать отметку'}
            onClick={_onUpdate}
            onKeyDown={onKeyDown}
          >
            {item.skip ? (
              <CrossIcon
                className={cn(
                  style.DeviceEvent__icon,
                  style.DeviceEvent__icon_small,
                  'text-danger',
                )}
              />
            ) : (
              <CheckIcon
                className={cn(
                  style.DeviceEvent__icon,
                  style.DeviceEvent__icon_small,
                  'text-success',
                )}
              />
            )}
          </div>
          <div ref={additionalRef} className={style.DeviceEvent__additional}>
            <div
              role="button"
              tabIndex={0}
              className={cn(
                style.DeviceEvent__iconWrapper,
                style.DeviceEvent__iconWrapper_interactive,
              )}
              onClick={(e) => {
                if (additionalRef.current) {
                  setShowPopover(true)
                  setPopoverLeft(e.pageX)
                  setPopoverTop(e.pageY)
                }
              }}
              onKeyDown={() => undefined}
            >
              <DotsIcon className={style.DeviceEvent__icon} />
            </div>
            {showPopover && (
              <Popover
                ref={popoverRef}
                id="device-event-popover"
                className={style.DeviceEvent__popover}
                placement="left"
                style={{
                  top: popoverTop + 'px',
                  left: popoverLeft + 'px',
                }}
                arrowProps={{
                  ref: () => undefined,
                  style: {
                    top: '50%',
                    transform: 'translateY(-50%)',
                  },
                }}
                content
              >
                <DeviceEventActionList
                  instance={item}
                  onDelete={onDelete}
                  onClose={() => setShowPopover(false)}
                />
              </Popover>
            )}
          </div>
        </Grid.Col>
      </Grid.Row>
    </ListItem>
  )
}
