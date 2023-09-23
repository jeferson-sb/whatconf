import * as RNToast from '@radix-ui/react-toast'
import cx from 'clsx'

import styles from './Toast.module.css'

type ToastShape = {
  type: 'warn' | 'success' | 'error'
  title: string
  description?: string
  placement?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
}

type ToastProps = ToastShape & {
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const colors = {
  warn: {
    '--_bg-color': 'var(--yellow-2)',
  },
  success: {
    '--_bg-color': 'var(--green-2)',
  },
  error: {
    '--_bg-color': 'var(--red-2)',
  },
}

const Toast = ({
  placement = 'bottom-right',
  title,
  description,
  type,
  children,
  onOpenChange,
}: ToastProps) => {
  const viewportClass = cx({
    [styles.viewport as string]: true,
    [styles[`viewport--${placement}`] as string]: true,
  })

  return (
    <>
      <RNToast.Root
        className={styles.root}
        style={colors[type]}
        defaultOpen
        onOpenChange={onOpenChange}
      >
        <RNToast.Title className={styles.title}>{title}</RNToast.Title>
        <RNToast.Description className={styles.description} asChild>
          <p>{description}</p>
        </RNToast.Description>
        {children}
      </RNToast.Root>
      <RNToast.Viewport className={viewportClass} />
    </>
  )
}

export { Toast }
export type { ToastShape }
