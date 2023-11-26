import { useForm } from 'react-hook-form'
import cx from 'clsx'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './form.module.css'

import { Button } from '../base/button/Button'
import { Stack } from '../base/stack/Stack'
import { Checkmark } from '../icons'
import { type CreateFormState, creationValidationSchema } from './schema'
import * as Category from '../../../domain/Category'

type CreateFormProps = {
  onSubmit: (SubmitHandler: CreateFormState) => void
  categories: Category.Type[]
  isLoading?: boolean
}

const CreateForm = ({ onSubmit, categories, isLoading = false }: CreateFormProps) => {
  const { register, handleSubmit, watch, formState } = useForm<CreateFormState>(
    {
      resolver: zodResolver(creationValidationSchema),
    }
  )
  const { errors } = formState
  const descriptionValue = watch('description', '')

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          className={styles.input}
          aria-invalid={errors?.title ? 'true' : 'false'}
          {...register('title')}
        />
        {errors?.title && (
          <small
            aria-live="polite"
            className={cx(styles.message, styles.messageError)}
          >
            {errors?.title?.message}
          </small>
        )}

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          horizontal="false"
          className={styles.textarea}
          rows={5}
          aria-describedby="description-help"
          aria-invalid={errors?.description ? 'true' : 'false'}
          {...register('description')}
        />
        <small className={styles.message}>{descriptionValue?.length}/300</small>
        {errors?.description && (
          <small
            aria-live="polite"
            id="description-help"
            className={cx(styles.message, styles.messageError)}
          >
            {errors?.description?.message}
          </small>
        )}

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register('virtual')}
          />
          <Checkmark />
          <span>Is virtual?</span>
        </label>

        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <input
          type="text"
          id="location"
          className={styles.input}
          aria-invalid={errors?.location ? 'true' : 'false'}
          {...register('location')}
        />
        {errors?.location && (
          <small
            aria-live="polite"
            className={cx(styles.message, styles.messageError)}
          >
            {errors?.location?.message}
          </small>
        )}

        <label htmlFor="link" className={styles.label}>
          Link
        </label>
        <input
          type="url"
          id="link"
          placeholder="https://myawesome.conf"
          className={styles.input}
          aria-invalid={errors?.link ? 'true' : 'false'}
          {...register('link')}
        />
        {errors?.link && (
          <small
            aria-live="polite"
            className={cx(styles.message, styles.messageError)}
          >
            {errors?.link?.message}
          </small>
        )}

        <Stack justify="space-between" horizontal>
          <div>
            <label htmlFor="startDate" className={styles.label}>
              First day
            </label>
            <input
              data-testid="startDate"
              placeholder="Select Date and Time"
              type="date"
              className={styles.input}
              aria-invalid={errors?.startDate ? 'true' : 'false'}
              {...register('startDate')}
            />
            {errors?.startDate && (
              <small
                aria-live="polite"
                className={cx(styles.message, styles.messageError)}
              >
                {errors?.startDate?.message}
              </small>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className={styles.label}>
              Last day
            </label>
            <input
              data-testid="endDate"
              placeholder="Select Date and Time"
              type="date"
              className={styles.input}
              aria-invalid={errors?.endDate ? 'true' : 'false'}
              {...register('endDate')}
            />
            {errors?.endDate && (
              <small
                aria-live="polite"
                className={cx(styles.message, styles.messageError)}
              >
                {errors?.endDate?.message}
              </small>
            )}
          </div>
        </Stack>

        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          className={styles.select}
          {...register('category')}
        >
          {categories?.length > 0 ? (
            categories.map((ctg) => (
              <option key={ctg.id} value={ctg.name.toLowerCase()}>
                {ctg.name}
              </option>
            ))
          ) : (
            <option value="none">Uncategorized</option>
          )}
        </select>

        <Button type="submit">{isLoading ? 'Creating...' : 'Submit'}</Button>
      </Stack>
    </form>
  )
}

export { CreateForm }
