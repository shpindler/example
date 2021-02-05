import { GeneralPermissions } from '@/types/permissions/main'
import React from 'react'

export const GeneralPermissionsContext = React.createContext<
  Partial<GeneralPermissions>
>({})
