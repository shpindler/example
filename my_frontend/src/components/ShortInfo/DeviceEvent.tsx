import { Grid } from '@/components/Grid'
import { Image } from '@/components/Image'
import { KeyValueDict } from '@/components/KeyValueDict'
import { ShortInfoProps } from '@/components/ShortInfo/index'
import { SiteLink } from '@/components/SiteLink'
import { Title } from '@/components/Title'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { DeviceEventDefaultProvider } from '@/providers/device-event'
import cn from 'classnames'
import React from 'react'

import style from './DeviceEvent.module.scss'

export interface DeviceEventShortInfoProps<
  ProviderType extends typeof DeviceEventDefaultProvider
> extends ShortInfoProps<DeviceEventType>,
    React.ComponentPropsWithoutRef<'div'> {
  Provider: ProviderType
}

export const DeviceEventShortInfo = <
  ProviderType extends typeof DeviceEventDefaultProvider
>({
  instance,
  Provider,
  ...otherProps
}: DeviceEventShortInfoProps<ProviderType>): JSX.Element => {
  const ProviderInstance = new Provider({ instance })
  const dictItems = [
    {
      key: 'Время получения',
      value: instance.creationDate.toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    },
    {
      key: 'Офис',
      value: (
        <SiteLink
          href={`/timeattendance/offices/${instance.office.id}`}
          underlined
        >
          {instance.office.name}
        </SiteLink>
      ),
    },
    { key: 'Терминал', value: instance.deviceName },
    { key: 'Способ отметки', value: ProviderInstance.modeText },
    { key: 'Статус', value: ProviderInstance.statusText },
    { key: 'Клиент', value: instance.workCode.name },
    { key: 'Комментарий', value: instance.comment },
  ]

  return (
    <Grid.Row noGutters {...otherProps}>
      <Grid.Col xs="auto" className="pr-3">
        <Image
          src={instance.image || ProviderInstance.imageStatusIcon}
          width={128}
          height={128}
        />
      </Grid.Col>
      <Grid.Col>
        <Title level={3}>
          <SiteLink
            href={`/timeattendance/employees/${instance.employee.id}`}
            underlined
          >
            {instance.employee.name}
          </SiteLink>
        </Title>
        <div className={cn(style.DeviceEventShortInfo__datetime, 'mb-3')}>
          {instance.eventDate.toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
          <span className={style.DeviceEventShortInfo__instanceId}>
            (id: {instance.id})
          </span>
        </div>
        <KeyValueDict items={dictItems} spacingLevel={1} />
      </Grid.Col>
    </Grid.Row>
  )
}
