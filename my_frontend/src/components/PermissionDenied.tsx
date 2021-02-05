import React from 'react'

export interface PermissionDeniedProps {}

export const PermissionDenied: React.FC<PermissionDeniedProps> = () => {
  return <div>Отказано в доступе</div>
}
