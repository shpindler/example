import DuplicateImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_duplicate.svg'
import EmptyImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_empty.svg'
import ManualImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_manual.svg'
import NoPhotoImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_no_photo.svg'
import UnknownImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_unknown.svg'
import UploadingImageStatusIcon from '@/assets/img/icons/icon__device-event_photo-placeholder_uploading.svg'
import { IconProps } from '@/components/Icons'
import { EditIcon } from '@/components/Icons/Edit'
import { ExternalIcon } from '@/components/Icons/External'
import { FaceIcon } from '@/components/Icons/Face'
import { FileIcon } from '@/components/Icons/File'
import { FingerPrintIcon } from '@/components/Icons/FingerPrint'
import { IdCardIcon } from '@/components/Icons/IdCard'
import { PasswordIcon } from '@/components/Icons/Password'
import { QuestionIcon } from '@/components/Icons/Question'
import { SearchIcon } from '@/components/Icons/Search'
import { SmartphoneIcon } from '@/components/Icons/Smartphone'
import {
  DeviceEvent,
  DeviceEventImageStatus,
  DeviceEventMode,
  DeviceEventStatus,
} from '@/models/device-event'
import { BaseProvider } from '@/providers/base'
import React from 'react'

export class DeviceEventDefaultProvider extends BaseProvider<DeviceEvent> {
  static statusTexts: Record<number, string> = {
    [DeviceEventStatus.IN]: 'Приход',
    [DeviceEventStatus.OUT]: 'Уход',
    [DeviceEventStatus.CHECK]: 'Проверка',
  }

  static modeTexts = {
    [DeviceEventMode.DEFAULT]: '',
    [DeviceEventMode.HANDMADE]: 'Добавлена вручную',
    [DeviceEventMode.PASSWORD]: 'Пароль',
    [DeviceEventMode.FINGER]: 'Отпечаток пальца',
    [DeviceEventMode.CARD]: 'Карточка',
    [DeviceEventMode.OTHER]: 'Другой',
    [DeviceEventMode.FACE]: 'Лицо',
    [DeviceEventMode.TELEGRAM]: 'Отметка через Telegram',
    [DeviceEventMode.PHONE]: 'Отметка с телефона',
    [DeviceEventMode.EXTERNAL_SYSTEM]: 'Внешняя система',
    [DeviceEventMode.UNKNOWN]: 'Неопознанная отметка',
  }

  static imageStatusTexts = {
    [DeviceEventImageStatus.OK]: '',
    [DeviceEventImageStatus.DUPLICATE]: 'Дубликат фотографии',
    [DeviceEventImageStatus.BAD]: 'Неизвестная ошибка',
    [DeviceEventImageStatus.EMPTY]: 'Фотография отсутствует',
    [DeviceEventImageStatus.MANUAL]: 'Добавлена вручную',
    [DeviceEventImageStatus.UPLOADING]:
      'Фотография ещё не выгружена с терминала',
    [DeviceEventImageStatus.UNKNOWN_ERROR]: 'Неизвестная ошибка',
    [DeviceEventImageStatus.PARTIAL]: 'Изображение повреждено',
    [DeviceEventImageStatus.NO_PHOTO_FROM_DEVICE]:
      'Терминал не сделал фотографию',
  }

  get statusText(): string {
    return DeviceEventDefaultProvider.statusTexts[this.instance.status]
  }

  get modeText(): string {
    return DeviceEventDefaultProvider.modeTexts[this.instance.mode]
  }

  get imageStatusText(): string {
    return DeviceEventDefaultProvider.imageStatusTexts[
      this.instance.imageStatus
    ]
  }

  get ModeIcon(): React.FC<IconProps> {
    switch (this.instance.mode) {
      case DeviceEventMode.DEFAULT:
        return QuestionIcon
      case DeviceEventMode.HANDMADE:
        return EditIcon
      case DeviceEventMode.PASSWORD:
        return PasswordIcon
      case DeviceEventMode.FINGER:
        return FingerPrintIcon
      case DeviceEventMode.CARD:
        return IdCardIcon
      case DeviceEventMode.OTHER:
        return FileIcon
      case DeviceEventMode.FACE:
        return FaceIcon
      case DeviceEventMode.TELEGRAM:
      case DeviceEventMode.PHONE:
        return SmartphoneIcon
      case DeviceEventMode.EXTERNAL_SYSTEM:
        return ExternalIcon
      case DeviceEventMode.UNKNOWN:
        return SearchIcon
    }
    throw new Error('Incorrect Device Event mode.')
  }

  get imageStatusIcon(): string {
    switch (this.instance.imageStatus) {
      case DeviceEventImageStatus.OK:
        return ''
      case DeviceEventImageStatus.DUPLICATE:
        return DuplicateImageStatusIcon
      case DeviceEventImageStatus.BAD:
        return UnknownImageStatusIcon
      case DeviceEventImageStatus.EMPTY:
        return EmptyImageStatusIcon
      case DeviceEventImageStatus.MANUAL:
        return ManualImageStatusIcon
      case DeviceEventImageStatus.UPLOADING:
        return UploadingImageStatusIcon
      case DeviceEventImageStatus.UNKNOWN_ERROR:
        return UnknownImageStatusIcon
      case DeviceEventImageStatus.PARTIAL:
        return ''
      case DeviceEventImageStatus.NO_PHOTO_FROM_DEVICE:
        return NoPhotoImageStatusIcon
    }
    throw new Error('Incorrect Device Event image status.')
  }
}
