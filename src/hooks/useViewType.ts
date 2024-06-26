import { useCallback, useEffect, useMemo, useState } from 'react'

export type ViewType = 'list' | 'grid'

export function useViewType() {
  const [viewType, setViewType] = useState<ViewType>('grid')

  useEffect(() => {
    setViewType((localStorage.getItem('viewType') as ViewType) || 'grid')
  }, [])

  const toggleViewType = useCallback((newViewType: ViewType) => {
    setViewType(newViewType)
    localStorage.setItem('viewType', newViewType)
  }, [])

  return {
    viewType,
    toggleViewType,
  }
}
