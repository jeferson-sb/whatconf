import { render, screen } from '@testing-library/react'
import { expect, describe, test } from 'vitest'

import { Avatar } from './Avatar'

describe('<Avatar />', () => {
  describe('when image not defined', () => {
    test('render avatar with first letter', () => {
      render(<Avatar user={{ name: 'John Doe' }} />)

      expect(screen.getByText('J')).toBeDefined()
    })
  })

  describe('when image defined', () => {
    test('render avatar with image and name', () => {
      render(
        <Avatar
          user={{ name: 'John Doe', image: 'https://placekitten.com/200/300' }}
        />
      )

      expect(screen.getByText('John')).toBeDefined()
      expect(screen.getByAltText("John Doe's profile picture")).toBeDefined()
    })
  })
})
