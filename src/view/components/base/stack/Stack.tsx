import type { CSSProperties, PropsWithChildren } from 'react'

import styles from './Stack.module.css'

type StackProps = {
  spacing?: number
  horizontal?: boolean
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
}

const Stack = (props: PropsWithChildren<StackProps>) => {
  const variableStyles = {
    '--spacing': props.spacing ?? 'var(--size-2)',
    '--direction': props.horizontal ? 'row' : 'column',
    '--justify': props.justify,
  }

  return (
    <div className={styles.stack} style={variableStyles as CSSProperties}>
      {props.children}
    </div>
  )
}

export { Stack }
