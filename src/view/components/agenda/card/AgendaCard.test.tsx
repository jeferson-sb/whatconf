import { render, screen } from '@testing-library/react'
import { expect, describe, test } from 'vitest'

import { AgendaCard } from './AgendaCard'

describe('<AgendaCard />', () => {
  test('render conference details', () => {
    const event = {
      title: 'BR Stack',
      startDate: new Date(2023, 4, 1),
      endDate: new Date(2023, 4, 3),
      description: 'This is a conference about ...',
    }

    render(<AgendaCard event={event} />)

    expect(screen.getByText('BR Stack')).toBeDefined()
    expect(screen.getByText('This is a conference about ...')).toBeDefined()
  })

  test('render conference formatted dates', () => {
    const event = {
      title: 'BR Stack',
      startDate: new Date(2023, 4, 1),
      endDate: new Date(2023, 4, 3),
      description: 'This is a conference about ...',
    }

    render(<AgendaCard event={event} />)

    expect(screen.getByText('1 May')).toBeDefined()
    expect(screen.getByText('3 May')).toBeDefined()
  })

  describe.skip('when the start date is today', () => {
    test('show event as live', () => {
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(startDate.getDate() + 1)

      const event = {
        title: 'BR Stack',
        startDate,
        endDate,
        description: 'This is a conference about ...',
      }

      render(<AgendaCard event={event} />)

      expect(screen.getByText('live')).toBeDefined()
    })
  })
})
