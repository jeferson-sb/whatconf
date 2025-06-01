'use client'

import { AlertDialog } from '@/view/components/base/dialog'
import { Button } from '@/view/components/base/button/Button'
import Link from 'next/link'

import styles from './subscribe-dialog.module.css'

type SubscribeDialogProps = {
  dialogOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SubscribeDialog = ({
  dialogOpen,
  onOpenChange,
}: SubscribeDialogProps) => {
  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={onOpenChange}
      title="✋ You can't do that yet"
      description='You need to be authenticated to be able to subscribe, see your agenda and receive notifications for a conference. It takes just two clicks! '
    >
      <div className={styles['dialog-actions']}>
        <Button as={Link} href='/api/auth/signin'>
          Sign up now!
        </Button>
      </div>
    </AlertDialog>
  )
}

export { SubscribeDialog }
