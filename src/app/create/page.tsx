import { api } from '@/trpc/server'
import styles from './create.module.css'
import { Container } from '@/view/components/container/Container'
import { CreateForm } from '@/view/components/conf'
import { create } from '../actions'

const Create = async () => {
  const categories = await api.category.all()

  return (
    <Container>
      <h2 className={styles.title}>Enter your conference ✨</h2>
      <CreateForm categories={categories} action={create} />
    </Container>
  )
}

export default Create
