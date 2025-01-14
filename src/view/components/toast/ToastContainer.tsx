import { ToastProvider as RDToastProvider } from '@radix-ui/react-toast'

import { Toast, ToastShape } from './Toast'

const ToastContainer = ({
  toasts,
  removeToast,
}: {
  toasts: ToastShape[]
  removeToast: (i: number) => void
}) => (
  <RDToastProvider swipeDirection='up'>
    {toasts?.map((toast, index) => (
      <Toast
        key={index}
        title={toast.title}
        type={toast.type}
        description={toast.description}
        placement={toast.placement}
        onOpenChange={(open) => !open && removeToast(index)}
      />
    ))}
  </RDToastProvider>
)

export { ToastContainer }
