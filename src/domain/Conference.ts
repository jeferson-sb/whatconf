namespace Conference {
  export type EventData = {
    title: string
    description?: string
    location: string
    link: string
    virtual: boolean
    startDate: Date
    endDate: Date
    categoryId: string
    organizerId: string
  }

  type Conference = { id: string } & EventData

  export const create = (props: Conference): Conference => ({
    id: props.id,
    title: props.title,
    description: props?.description,
    location: props.location,
    link: props.link,
    virtual: props.virtual,
    startDate: props.startDate,
    endDate: props.endDate,
    categoryId: props.categoryId,
    organizerId: props.organizerId,
  })

  export type Type = Conference
}
export { Conference }
