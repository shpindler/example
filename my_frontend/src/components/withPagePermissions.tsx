import { Loading } from '@/components/Loading'
import { LoadingError } from '@/components/LoadingError'
import { PagePermissionsContext } from '@/components/PagePermissions.context'
import { Permissions } from '@/models/permissions'
import { ApiHookResult } from '@/types/api'
import { getErrorText } from '@/utils/error'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface withPagePermissionsProps {}

export function withPagePermissions<Props, PermissionsType extends Permissions>(
  Component: React.ComponentType<Props>,
  usePermissions: () => ApiHookResult<PermissionsType>,
): React.FC<Props> {
  return function ComponentWithPagePermissions(props) {
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
      <PagePermissionsContext.Provider value={permissions}>
        <Component {...props} />
      </PagePermissionsContext.Provider>
    )
  }
}
