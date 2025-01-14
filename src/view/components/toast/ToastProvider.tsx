'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'

import { ToastContainer } from './ToastContainer'
import { ToastShape } from './Toast'

type ToastContextValue = {
  toasts: ToastShape[]
  showToast: (toast: ToastShape) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastShape[]>([])

  const showToast = (toast: ToastShape) => setToasts((prev) => [...prev, toast])
  const removeToast = (index: number) =>
    setToasts((prev) => prev.filter((_, i) => i !== index))

  const value = useMemo(() => ({ toasts, showToast }), [])

  useEffect(() => {
    let t;
    if (toasts.length > 0) {
      t = setTimeout(() => removeToast(toasts.length - 1), 5000)
    }

    return () => clearTimeout(t)
  }, [toasts])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export { ToastContext, ToastProvider }
