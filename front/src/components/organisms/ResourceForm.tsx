import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { InputGroup, SelectGroup } from '../molecules'
import { Button, ValidationMessage, Radio } from '../atoms'
import { FlexBox, dimensions } from '../../styles'
import { urls } from '../../constants'

const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  margin-top: ${dimensions.spacing.xl};

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
  topics: z.string(),
  // .refine(
  //   (val) =>
  //     val.every((topic) => options.map((o) => o.value).includes(topic)),
  //   {
  //     message: 'Algunos de los temas seleccionados no son válidos',
  //   }
  // ),
  resourceType: z.string(),
  userEmail: z.string().optional(),
})

type TResourceForm = z.infer<typeof ResourceFormSchema> & {
  topics: string[]
  status: string
}

const ResourceFormStyled = styled.form`
  ${Radio} {
    margin-top: ${dimensions.spacing.xl};
  }
`

type TTopicsSlug = {
  slug?: string
}

export const ResourceForm: FC<TTopicsSlug> = ({ slug }) => {
  const getTopics = () =>
    fetch(`${urls.getTopics}?slug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching topics: ${res.statusText}`)
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(`Error fetching topics: ${err.message}`)
      })

  const { data: fetchedTopics } = useQuery({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  console.log(fetchedTopics?.topics)

  const mappedTopics = fetchedTopics?.topics.map(
    (topic: { id: string; name: string }) => {
      const options = { value: topic.id, label: topic.name }
      return options
    }
  )
  console.log(mappedTopics)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TResourceForm>({
    resolver: zodResolver(ResourceFormSchema),
  })

  const navigate = useNavigate()

  const registerNewResource = async (resource: object) => {
    console.log(resource)
    const config = {
      method: 'POST',
      body: JSON.stringify(resource),
      headers: {
        'Content-type': 'application/json',
      },
    }
    try {
      const res = await fetch(urls.createResource, config)

      const resData = await res.json()
      console.log(resData)

      if (res.status === 204) {
        navigate('/')
      }
    } catch (error) {
      throw new Error('Error registering new resource')
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const {
      title,
      description,
      url,
      topics,
      resourceType,
      userEmail = 'admin@admin.com',
    } = data
    try {
      await registerNewResource({
        title,
        description,
        url,
        topics: [topics],
        resourceType,
        userEmail,
      })
      reset()
    } catch (error) {
      throw new Error('Error sending new resource data')
    }
  })

  return (
    <ResourceFormStyled onSubmit={onSubmit}>
      <InputGroup
        hiddenLabel
        id="title"
        label="Título"
        placeholder="Título"
        {...register('title')}
        name="title"
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
        name="description"
      />
      <InputGroup
        hiddenLabel
        id="url"
        label="URL"
        placeholder="URL"
        {...register('url')}
        name="url"
        error={errors.url && true}
        validationMessage={errors.url?.message}
        validationType="error"
      />
      {fetchedTopics && (
        <SelectGroup
          id="topics"
          label="Tema"
          options={mappedTopics}
          {...register('topics')}
          name="topics"
          error={!!errors.topics}
          validationMessage={errors.topics?.message}
        />
      )}
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
        {errors?.title || errors?.description || errors?.url ? (
          <ValidationMessage />
        ) : null}
      </FlexErrorStyled>
      <ButtonContainerStyled align="stretch">
        <Button type="submit">Crear</Button>
      </ButtonContainerStyled>
    </ResourceFormStyled>
  )
}
