import React from 'react'
import styles from './Container.module.css'

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>{children}</div>
)

export { Container }
