import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect, describe, test } from 'vitest'

import { FeedCard } from './FeedCard'

describe('<FeedCard />', () => {
  test('should render card', () => {
    const startDate = new Date(2023, 3, 5)
    const endDate = new Date(2023, 3, 7)
    const onSubscribe = vi.fn()

    render(
      <FeedCard
        title='Conference one'
        description='Lorem ipsum dolor sit'
        startDate={startDate}
        endDate={endDate}
        link='https://conf.org'
        location='Mars'
        category='Front-end'
        onSubscribe={onSubscribe}
      />
    )
    expect(screen.getByText('Conference one')).toBeDefined()
    expect(screen.getByText('Lorem ipsum dolor sit')).toBeDefined()
    expect(screen.getByText('Mars')).toBeDefined()
    expect(screen.getByText('Front-end')).toBeDefined()
  })

  test('render the formatted dates', () => {
    const startDate = new Date(2023, 3, 5)
    const endDate = new Date(2023, 3, 7)
    const onSubscribe = vi.fn()

    render(
      <FeedCard
        title='Conference one'
        description='Lorem ipsum dolor sit'
        startDate={startDate}
        endDate={endDate}
        link='https://conf.org'
        location='Mars'
        category='Front-end'
        onSubscribe={onSubscribe}
      />
    )
    expect(screen.getByText('Apr 5, 2023', { exact: false })).toBeDefined()
    expect(screen.getByText('Apr 7, 2023', { exact: false })).toBeDefined()
  })

  test('call onSubscribe click', async () => {
    const startDate = new Date(2023, 3, 5)
    const endDate = new Date(2023, 3, 7)
    const onSubscribe = vi.fn()
    const user = userEvent.setup()

    render(
      <FeedCard
        title='Conference one'
        description='Lorem ipsum dolor sit'
        startDate={startDate}
        endDate={endDate}
        link='https://conf.org'
        location='Mars'
        category='Front-end'
        onSubscribe={onSubscribe}
      />
    )

    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(onSubscribe).toHaveBeenCalledOnce()
  })
})
