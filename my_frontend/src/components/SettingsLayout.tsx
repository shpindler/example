import { useSettingsPermissions } from '@/api/settings'
import { PageLayoutWithAside } from '@/components/PageLayoutWithAside'
import { SettingsAsideMenu } from '@/components/SettingsAsideMenu'
import { withLayoutPermissions } from '@/components/withLayoutPermissions'
import React from 'react'

export interface SettingsLayoutProps {}

export const SettingsLayout: React.FC<SettingsLayoutProps> = withLayoutPermissions(
  function SettingsLayout_({ children }) {
    return (
      <PageLayoutWithAside asideMenu={<SettingsAsideMenu />}>
        {children}
      </PageLayoutWithAside>
    )
  },
  useSettingsPermissions,
)
