import { render, screen } from '@testing-library/react'
import { vi, expect, describe, test } from 'vitest'

import { FeedList } from './FeedList'

const events = [
  {
    id: ':e1',
    title: 'Event one',
    description: 'This a keynote',
    startDate: new Date(2022, 11, 13),
    endDate: new Date(2022, 11, 14),
    link: 'https://example.com',
    organizerId: ':o2',
    virtual: true,
    location: 'online',
  },
  {
    id: ':e2',
    title: 'Event two',
    description: 'This a tech event about TypeScript',
    startDate: new Date(2022, 11, 13),
    endDate: new Date(2022, 11, 14),
    link: 'https://example.com',
    organizerId: ':o2',
    virtual: true,
    location: 'online',
  },
]

describe('<FeedList />', () => {
  test('should render list of events', () => {
    render(<FeedList events={events} />)
    expect(screen.getByText('Event one')).toBeDefined()
    expect(screen.getByText('Event two')).toBeDefined()
  })
})
