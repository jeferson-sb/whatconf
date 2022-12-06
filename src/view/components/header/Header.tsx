import styles from './Header.module.css'

const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>WhatConf</h1>
    <p className={styles.subheadline}>
      👨‍💻👩‍💻 <em>Never miss a tech conf again.</em>
    </p>
  </div>
)

export { Header }
