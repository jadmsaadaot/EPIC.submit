import React, { useEffect, useState } from 'react'
import { useModal } from './modalStore'

interface ModalProviderProps {
  children: React.ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { showingModal } = useModal()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {children}
      {showingModal}
    </>
  )
}

export default ModalProvider
