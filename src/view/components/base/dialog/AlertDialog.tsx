import * as RDAlertDialog from '@radix-ui/react-alert-dialog'

import { Close } from '@/view/components/icons'
import styles from './AlertDialog.module.css'

type AlertDialogProps = {
  title: string
  description: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const AlertDialog = ({
  title,
  description,
  open,
  onOpenChange,
  children,
}: AlertDialogProps) => (
  <RDAlertDialog.Root open={open} onOpenChange={onOpenChange}>
    <RDAlertDialog.Portal>
      <RDAlertDialog.Overlay className={styles.overlay} />
      <RDAlertDialog.Content className={styles.content}>
        <RDAlertDialog.Title className={styles.title}>
          {title}
        </RDAlertDialog.Title>
        <RDAlertDialog.Description className={styles.description}>
          {description}
        </RDAlertDialog.Description>
        <RDAlertDialog.Action asChild>
          <button className={styles.close}>
            <Close />
          </button>
        </RDAlertDialog.Action>
        {children}
      </RDAlertDialog.Content>
    </RDAlertDialog.Portal>
  </RDAlertDialog.Root>
)

export { AlertDialog }
