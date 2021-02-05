import { LayoutPermissionsContext } from '@/components/LayoutPermissions.context'
import { Loading } from '@/components/Loading'
import { LoadingError } from '@/components/LoadingError'
import { Permissions } from '@/models/permissions'
import { ApiHookResult } from '@/types/api'
import { getErrorText } from '@/utils/error'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface withLayoutPermissionsProps {}

export function withLayoutPermissions<
  Props,
  PermissionsType extends Permissions
>(
  Component: React.ComponentType<Props>,
  usePermissions: () => ApiHookResult<PermissionsType>,
): React.FC<Props> {
  return function ComponentWithLayoutPermissions(props) {
    const { t } = useTranslation()
    const {
      data: permissions,
      isLoading: isPermissionsLoading,
      error: permissionsError,
    } = usePermissions()

    if (isPermissionsLoading) {
      return <Loading />
    } else if (permissionsError || !permissions) {
      return <LoadingError message={t(getErrorText(permissionsError))} />
    }

    return (
      <LayoutPermissionsContext.Provider value={permissions}>
        <Component {...props} />
      </LayoutPermissionsContext.Provider>
    )
  }
}
