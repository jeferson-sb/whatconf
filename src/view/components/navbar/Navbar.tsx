'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import styles from './Navbar.module.css'

const Navbar = () => {
  const pathname = usePathname()

  // TODO: Refactor to use anchor positioning
  const indicatorStyles = {
    '/': { '--translateActiveX': '0%' },
    '/year': { '--translateActiveX': '100%' },
    '/agenda': { '--translateActiveX': 'calc(200% + 16px)' },
  }

  return (
    <header className={styles.header}>
      <nav id='main-nav'>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} href='/'>
              Feed
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href='/year'>
              This year
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href='/agenda'>
              Agenda
            </Link>
          </li>
          <span
            className={styles.indicator}
            style={indicatorStyles[pathname]}
          ></span>
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }
