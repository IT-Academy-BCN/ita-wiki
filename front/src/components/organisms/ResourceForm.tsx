import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import { ChangeEvent, FC } from 'react'
// eslint-disable-next-line import/no-cycle
import { InputGroup, SelectGroup } from '../molecules'
import { Button, ValidationMessage, Radio } from '../atoms'
import { FlexBox, dimensions } from '../../styles'
import { paths, urls } from '../../constants'

const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  margin: ${dimensions.spacing.xs} 0;

  ${Button} {
    font-weight: 500;
    margin: 0rem;
  }
`

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.xxxs};
  margin-left: 0.2rem;
`

const ResourceFormSchema = z.object({
  title: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(1, { message: 'Este campo es obligatorio' }),
  description: z.string().optional(),
  url: z
    .string({ required_error: 'Este campo es obligatorio' })
    .url({ message: 'La URL proporcionada no es válida' }),
  topics: z.string().refine((val) => val !== 'Options', {
    message: 'Debe seleccionar al menos un tema',
  }),
  topicId: z
    .string()
    .optional()
    .refine((val) => val !== '', 'Debe seleccionar un tema válido'),
  resourceType: z.string(),
  userEmail: z.string().optional(),
})

export type TResourceForm = Omit<
  z.infer<typeof ResourceFormSchema>,
  'topics'
> & {
  topics: string | string[]
  topicId?: string
  id?: string
}

const ResourceFormStyled = styled.form`
  ${Radio} {
    margin-top: ${dimensions.spacing.xl};
  }
`

type TSelectOption = {
  value: string
  label: string
}

type TSelectOptions = {
  selectOptions: TSelectOption[]
  initialValues?: Partial<TResourceForm>
  resourceId?: string
}

const createResourceFetcher = (resource: object) =>
  fetch(urls.createResource, {
    method: 'POST',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al crear el recurso')
      }
      return res.status === 204 ? {} : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))
const updateResourceFetcher = (resource: object) =>
  fetch(urls.updateResource, {
    method: 'PATCH',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al actualizar el recurso')
      }
      return res.status === 204 ? {} : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))

export const ResourceForm: FC<TSelectOptions> = ({
  selectOptions,
  initialValues,
  resourceId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TResourceForm>({
    resolver: zodResolver(ResourceFormSchema),
    defaultValues: initialValues ?? undefined,
  })
  const navigate = useNavigate()
  const createResource = useMutation(createResourceFetcher, {
    onSuccess: () => {
      reset()
      navigate(paths.home)
    },
  })
  const updateResource = useMutation(updateResourceFetcher, {
    onSuccess: () => {
      reset()
      navigate(paths.home)
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    const { title, description, url, topics, resourceType } = data

    await createResource.mutateAsync({
      title,
      description,
      url,
      topics: [topics],
      resourceType,
    })
  })
  const onSubmitUpdate = handleSubmit(async (data) => {
    const { title, description, url, topicId, resourceType } = data

    const updatedData = {
      id: resourceId,
      title,
      description,
      url,
      topicId: topicId ?? initialValues?.topicId ?? '',
      resourceType,
    }
    // console.log(updatedData, 'updatedData')
    await updateResource.mutateAsync(updatedData)
  })
  const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTopicId = event.target.value
    setValue('topicId', selectedTopicId)
  }
  // console.log(initialValues, 'initialValues')
  return (
    <ResourceFormStyled onSubmit={initialValues ? onSubmitUpdate : onSubmit}>
      <InputGroup
        hiddenLabel
        id="title"
        label="Título"
        placeholder="Título"
        {...register('title')}
        data-testid="resourceTitle"
        error={errors.title && true}
        validationMessage={errors.title?.message}
        validationType="error"
      />
      <InputGroup
        hiddenLabel
        id="description"
        label="Descripción"
        placeholder="Descripción"
        {...register('description')}
      />
      <InputGroup
        hiddenLabel
        id="url"
        label="URL"
        placeholder="URL"
        {...register('url')}
        error={errors.url && true}
        validationMessage={errors.url?.message}
        validationType="error"
      />

      <SelectGroup
        id="topics"
        label="Tema"
        options={selectOptions}
        {...register('topics')}
        defaultValue={initialValues?.topicId}
        error={!!errors.topics}
        validationMessage={errors.topics?.message}
        onChange={handleTopicChange}
      />

      <Radio
        {...register('resourceType')}
        options={[
          { id: 'VIDEO', name: 'Video' },
          { id: 'TUTORIAL', name: 'Curso' },
          { id: 'BLOG', name: 'Blog' },
        ]}
        inputName="resourceType"
      />
      <FlexErrorStyled align="start">
        {errors?.title ||
        errors?.description ||
        errors?.url ||
        errors?.topics ? (
          <ValidationMessage />
        ) : null}
      </FlexErrorStyled>
      <ButtonContainerStyled align="stretch">
        <Button type="submit">{initialValues ? 'Editar' : 'Crear'}</Button>
      </ButtonContainerStyled>
    </ResourceFormStyled>
  )
}
