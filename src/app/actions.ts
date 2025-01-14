'use server'

import { api } from "@/trpc/server"
import { CreateFormState } from "@/view/components/conf"

export async function create(formData: CreateFormState) {
  const categories = await api.category.all()

  const {
    title,
    description,
    link,
    category,
    location,
    virtual,
    startDate,
    endDate,
  } = formData

  const queryCategory = categories?.find(
    (c) => c.name.toLowerCase() === category
  )
  const categoryId = queryCategory?.id

  try {
    await api.conference.create({
      title,
      description,
      categoryId,
      location,
      virtual,
      link,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })
  } catch (error) {
    console.error(error)
  }
}

export async function remindMe({ userId, eventId }: { userId: string, eventId: string }) {
  try {
    await api.reminder.create({ userId, eventId })
  } catch (error) {
    console.error(error)
  }
}

export async function reminderPerEvent({ userId, eventId }: { userId: string, eventId: string }) {
  try {
    const reminder = await api.reminder.getByEvent({ userId, eventId })
    return reminder
  } catch (error) {
    console.error(error)
    return null
  }
}