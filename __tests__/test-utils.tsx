import React from 'react'
import { render } from '@testing-library/react'
import { ToastProvider } from '@/view/components/toast/ToastProvider'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
        {children}
    </ToastProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}