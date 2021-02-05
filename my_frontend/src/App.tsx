import 'styles/main.scss'
import '@/utils/i18n'

import { useGeneralPermissions } from '@/api/general-permissions'
import { useUser } from '@/api/user'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { GeneralPermissionsContext } from '@/components/GeneralPermissions.context'
import { Loading } from '@/components/Loading'
import { LoadingError } from '@/components/LoadingError'
import { UserContext } from '@/components/User.context'
import { mapUsernameToKey } from '@/utils/user-key'
import React, { useEffect, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const IndexPage = React.lazy(() =>
  import('@/components/pages/timeattendance').then((Module) => ({
    default: Module.IndexPage,
  })),
)

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const { data: user, isLoading: isUserLoading, error: userError } = useUser()
  useEffect(() => {
    if (user) {
      window.userKey = mapUsernameToKey(user.username)
    }
  }, [JSON.stringify(user)])
  const {
    data: permissions,
    isLoading: isPermissionsLoading,
    error: permissionsError,
  } = useGeneralPermissions()
  const isLoading = useMemo(() => isUserLoading || isPermissionsLoading, [
    isUserLoading,
    isPermissionsLoading,
  ])
  const error = useMemo(() => userError || permissionsError, [
    userError,
    permissionsError,
  ])
  if (isLoading) {
    return <Loading />
  } else if (error || !user || !permissions) {
    return <LoadingError />
  }

  return (
    <ErrorBoundary>
      <DynamicComponentLoading>
        <UserContext.Provider value={user}>
          <GeneralPermissionsContext.Provider value={permissions}>
            <BrowserRouter>
              <Route
                render={({ location }) => (
                  <Switch location={location}>
                    <Route path="/timeattendance">
                      <IndexPage />
                    </Route>
                  </Switch>
                )}
              />
            </BrowserRouter>
          </GeneralPermissionsContext.Provider>
        </UserContext.Provider>
      </DynamicComponentLoading>
    </ErrorBoundary>
  )
}
