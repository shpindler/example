import { BaseModel } from '@/models/base'
import React from 'react'

export interface ShortInfoProps<Model> {
  instance: Model
}

export function ShortInfo<Model extends BaseModel>({
  children,
}: React.PropsWithChildren<ShortInfoProps<Model>>): JSX.Element {
  return <div>{children}</div>
}
