export type Category = {
  id: string
  name: string
}

export const create = (props: Category): Category => ({
  id: props.id,
  name: props.name,
})

export type Type = Category
