import { Loading } from '@/components/Loading'
import React, { Suspense } from 'react'

export interface DynamicComponentLoadingProps {}

export const DynamicComponentLoading: React.FC<DynamicComponentLoadingProps> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
