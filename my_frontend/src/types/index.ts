import { Dispatch, SetStateAction } from 'react'

export interface RawOption<R = string> {
  name: string
  value: R
}

export interface TimezonesResponseData {
  options: RawOption[]
}

export type StateSetter<T> = Dispatch<SetStateAction<T>>

export interface RawData {}

export type PartialKeys<T, Keys extends keyof T> = Omit<T, Keys> &
  Partial<Pick<T, Keys>>

export type RequiredKeys<T, Keys extends keyof T> = Omit<T, Keys> &
  Required<Pick<T, Keys>>
