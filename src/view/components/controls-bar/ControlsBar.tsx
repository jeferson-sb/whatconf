import Link from 'next/link'
import { Session } from 'next-auth'

import { Button } from '@/view/components/base/button/Button'
import { Plus } from '@/view/components/icons'
import { Avatar } from '@/view/components/avatar'

import styles from './controls-bar.module.css'

type ControlsBarProps = {
  session: Session | null
}

const ControlsBar = ({ session }: ControlsBarProps) => {
  return (
    <div className={styles.controls}>
      <Button as={Link} href='/create' colorScheme='gray'>
        <Plus /> <span>Submit a conf</span>
      </Button>
      {session?.user ? (
        <div className={styles.menu}>
          <Avatar user={session?.user} />
          <Button as={Link} variant='cutted' href='/api/auth/signout'>
            Logout
          </Button>
        </div>
      ) : (
        <Button as={Link} variant='outline' href='/api/auth/signin'>
          Sign in
        </Button>
      )}
    </div>
  )
}

export { ControlsBar }
