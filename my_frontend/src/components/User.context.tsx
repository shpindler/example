import { User } from '@/models/user'
import React from 'react'

export const UserContext = React.createContext<User>({} as User)
