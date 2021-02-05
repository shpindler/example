import { usePositionsPermissions } from '@/api/positions'
import { PositionsList } from '@/components/Lists/Positions'
import { withPagePermissions } from '@/components/withPagePermissions'
import React from 'react'

export const PositionDictionaryPage = withPagePermissions(
  function PositionDictionaryPageWithPagePermissions() {
    return (
      <div className="fade">
        <PositionsList />
      </div>
    )
  },
  usePositionsPermissions,
)
