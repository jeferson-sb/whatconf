import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from './Button'

describe('<Button />', () => {
  test('render button', () => {
    render(<Button>Get started</Button>)

    expect(screen.getByText('Get started')).toBeDefined()
  })

  test('call on click', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Get started</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toBeCalledTimes(1)
  })

  test('render as anchor', () => {
    render(<Button as="a">Home</Button>)

    expect(screen.getByText('Home').tagName).toBe('A')
  })
})
