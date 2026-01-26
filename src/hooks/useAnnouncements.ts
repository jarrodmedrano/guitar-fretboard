'use client'

import { useState, useCallback } from 'react'

export function useAnnouncements() {
  const [announcement, setAnnouncement] = useState('')

  const announce = useCallback((message: string) => {
    setAnnouncement(message)
  }, [])

  return { announcement, announce }
}
