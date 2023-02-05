import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'
import * as RHF from 'react-hook-form'

import { CreateForm } from './CreateForm'

const categories = [
  { id: '1', name: 'front-end' },
  { id: '2', name: 'native' },
  { id: '3', name: 'gaming' },
  { id: '4', name: 'VR' },
]

vi.mock('react-hook-form')

beforeEach(() => {
  vi.spyOn(RHF, 'useForm').mockImplementation(() => {
    return {
      register: vi.fn(),
      handleSubmit: vi.fn((fn) => fn()),
      watch: vi.fn(),
      formState: { errors: {} },
    }
  })
})

describe('<CreateForm />', () => {
  it('render select of categories', () => {
    const handleSubmit = vi.fn()

    render(<CreateForm categories={categories} onSubmit={handleSubmit} />)

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeDefined()
    })
  })

  describe('when categories empty', () => {
    it('render uncategorized option', () => {
      const handleSubmit = vi.fn()

      render(<CreateForm categories={[]} onSubmit={handleSubmit} />)

      expect(screen.getByText(/uncategorized/i)).toBeDefined()
    })
  })

  describe('onSubmit', () => {
    describe('when fields are empty', () => {
      it('render error message', async () => {
        const handleSubmit = vi.fn()
        vi.spyOn(RHF, 'useForm').mockImplementation(() => {
          return {
            register: vi.fn(),
            handleSubmit: vi.fn(),
            watch: vi.fn(),
            formState: {
              errors: {
                link: { message: 'Link is required' },
                location: { message: 'Location is required' },
              },
            },
          }
        })

        render(<CreateForm categories={categories} onSubmit={handleSubmit} />)

        await userEvent.type(screen.getByLabelText(/title/i), 'Test conf')
        await userEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(screen.findByText('Location is required')).toBeDefined()
        expect(screen.findByText('Link is required')).toBeDefined()
      })
    })

    describe('when fields are invalid', () => {
      it('render error message', async () => {
        const handleSubmit = vi.fn()
        vi.spyOn(RHF, 'useForm').mockImplementation(() => {
          return {
            register: vi.fn(),
            handleSubmit: vi.fn(),
            watch: vi.fn(),
            formState: {
              errors: {
                link: { message: 'Invalid URL' },
              },
            },
          }
        })

        render(<CreateForm categories={categories} onSubmit={handleSubmit} />)

        await userEvent.type(screen.getByLabelText(/title/i), 'Test conf')
        await userEvent.type(screen.getByLabelText(/location/i), 'Online')
        await userEvent.type(screen.getByLabelText(/link/i), '//conf.com')

        await userEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(screen.findByText('Invalid URL')).toBeDefined()
      })
    })

    describe('when fields are valid', () => {
      it('call on submit', async () => {
        const onSubmit = vi.fn()

        const { getByLabelText, getByTestId, getByRole, findByLabelText } =
          render(<CreateForm categories={categories} onSubmit={onSubmit} />)
        const user = userEvent.setup()

        await user.type(getByLabelText(/title/i), 'Test conf')
        await user.type(getByLabelText(/location/i), 'San Francisco')
        await user.type(getByLabelText(/link/i), 'https://example.com')

        await user.type(getByTestId('startDate'), '2023-01-25')
        await user.type(getByTestId('endDate'), '2023-01-26')

        await user.click(getByRole('button', { name: /submit/i }))

        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
      })
    })
  })
})
