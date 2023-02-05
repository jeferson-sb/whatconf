import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import styles from './create.module.css'

import { Container } from '../../view/components/container/Container'
import { trpc } from '../../utils/trpc'
import { CreateForm, CreateFormState } from '../../view/components/conf'

const Create: NextPage = () => {
  const router = useRouter()
  const categories = trpc.category.all.useQuery()
  const events = trpc.conference.create.useMutation()

  const handleSubmission = useCallback((values: CreateFormState) => {
    const {
      title,
      description,
      link,
      category,
      location,
      virtual,
      startDate,
      endDate,
    } = values

    const queryCategory = categories?.data?.find(
      (c) => c.name.toLowerCase() === category
    )
    const categoryId = queryCategory?.id

    events.mutate({
      title,
      description,
      categoryId,
      location,
      virtual,
      link,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })

    router.push('/')
  }, [])

  return (
    <Container>
      <h2 className={styles.title}>Enter your conference ✨</h2>
      <CreateForm categories={categories?.data} onSubmit={handleSubmission} />
    </Container>
  )
}

export default Create
