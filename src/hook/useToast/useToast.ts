import { ToastContext } from '@/view/components/toast/ToastProvider'
import { useContext } from 'react'

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined || context === null) {
    throw new Error('You need to wrap your component inside a ToastProvider')
  }

  return {
    toasts: context.toasts,
    showToast: context.showToast,
  }
}
