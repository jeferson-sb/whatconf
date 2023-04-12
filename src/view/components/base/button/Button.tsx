import cx from 'clsx'

import styles from './Button.module.css'

type ButtonProps<T extends React.ElementType> = {
  children: React.ReactNode
  onClick?: () => void
  as?: T
  href?: string
  colorScheme?: string
  variant?: 'outline' | 'ghost' | 'solid' | 'cutted'
}

const Button = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>
) => {
  const {
    children,
    onClick,
    as = 'button',
    colorScheme,
    variant,
    ...rest
  } = props
  const Component = as
  const classes = cx({
    [styles.button]: true,
    [styles['button-outline']]: variant === 'outline',
    [styles['button-cutted']]: variant === 'cutted',
  })

  const colorSchemes = {
    violet: {
      '--_bg-color': 'var(--violet-8)',
      '--_border-color': 'var(--violet-10)',
      '--_bg-hover-color': 'var(--violet-9)',
    },
    indigo: {
      '--_bg-color': 'var(--indigo-10)',
      '--_border-color': 'var(--indigo-11)',
      '--_bg-hover-color': 'var(--indigo-12)',
    },
    gray: {
      '--_bg-color': 'var(--gray-4)',
      '--_border-color': 'var(--gray-5)',
      '--_bg-hover-color': 'var(--gray-5)',
      '--_text-color': 'var(--gray-8)',
    },
  }

  const dynamicStyles = {
    ...(colorSchemes[colorScheme] ?? null),
  }

  return (
    <Component
      onClick={onClick}
      className={classes}
      style={dynamicStyles}
      {...rest}
    >
      {children}
    </Component>
  )
}

export { Button }
