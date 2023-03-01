import cx from 'clsx'

import styles from './Button.module.css'

type ButtonProps<T extends React.ElementType> = {
  children: React.ReactNode
  onClick?: () => void
  as?: T
  href?: string
}

const Button = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>
) => {
  const { children, onClick, as = 'button', ...rest } = props
  const Component = as
  const classes = cx({
    [styles.button]: true,
  })

  return (
    <Component onClick={onClick} className={classes} {...rest}>
      {children}
    </Component>
  )
}

export { Button }
