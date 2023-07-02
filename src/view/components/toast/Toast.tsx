import * as RNToast from '@radix-ui/react-toast'
import { useState } from 'react'
import cx from 'clsx'

import styles from './Toast.module.css'

type ToastProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'warn' | 'success' | 'error'
  title: string
  description?: string
  swipe?: 'down' | 'up' | 'right' | 'left'
  placement?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
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
  open,
  onOpenChange,
  swipe = 'down',
  placement = 'bottom-right',
  title,
  description,
  type,
  children,
}: ToastProps) => {
  const viewportClass = cx({
    [styles.viewport as string]: true,
    [styles[`viewport--${placement}`] as string]: true,
  })

  return (
    <RNToast.Provider swipeDirection={swipe}>
      <RNToast.Root
        className={styles.root}
        style={colors[type]}
        open={open}
        onOpenChange={onOpenChange}
      >
        <RNToast.Title className={styles.title}>{title}</RNToast.Title>
        <RNToast.Description className={styles.description} asChild>
          <p>{description}</p>
        </RNToast.Description>
        {children}
      </RNToast.Root>
      <RNToast.Viewport className={viewportClass} />
    </RNToast.Provider>
  )
}

export { Toast }
