import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'clsx'

import styles from './Navbar.module.css'

const Navbar = () => {
  const router = useRouter()

  // TODO: Refactor to use anchor positioning
  const indicatorStyles = {
    '/': { '--translateActiveX': '0%' },
    '/year': { '--translateActiveX': '100%' },
    '/agenda': { '--translateActiveX': 'calc(200% + 16px)' },
  }
  const path = router.asPath

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
            <Link className={styles.link} href="/year">
              This year
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/agenda">
              Agenda
            </Link>
          </li>
          <span
            className={styles.indicator}
            style={indicatorStyles[path]}
          ></span>
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }
