import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'clsx'

import styles from './Navbar.module.css'

const Navbar = () => {
  const router = useRouter()
  const isActive = (path: string) => path === router.asPath
  const indicatorStyle = cx({
    [styles.indicator]: true,
    [styles['indicator--left']]: isActive('/'),
    [styles['indicator--right']]: isActive('/agenda'),
  })

  return (
    <header className={styles.header}>
      <nav id="main-nav">
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} href="/">
              Feed
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/agenda">
              Agenda
            </Link>
          </li>
          <span className={indicatorStyle}></span>
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }
