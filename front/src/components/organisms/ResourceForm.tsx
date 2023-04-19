/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { InputGroup, SelectGroup } from '../molecules'
import { Button, ValidationMessage, Radio } from '../atoms'
import { FlexBox, dimensions } from '../../styles'


const options = [
  { value: '1', label: 'Primeros pasos' },
  { value: '2', label: 'Components' },
  { value: '3', label: 'UseState & useEffect' },
  { value: '4', label: 'Eventos' },
  { value: '5', label: 'Renderizado condicional' },
  { value: '6', label: 'Listas' },
  { value: '7', label: 'Estilos' },
  { value: '8', label: 'Debugging' },
  { value: '9', label: 'React router' },
  { value: '10', label: 'Hooks' },
  { value: '11', label: 'Context API' },
  { value: '12', label: 'Redux' },
  { value: '13', label: 'Proyectos' },
  { value: '14', label: 'Testing' },
]

const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  padding: 2rem 0.4rem 0rem;
`

const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: 0rem;
`

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.xxxs};
  margin-left: 0.2rem;
`

const ResourceFormSchema = z.object({
  title: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  description: z.string().optional(),
  url: z.string({ required_error: "Este campo es obligatorio" }).url({ message: "La URL proporcionada no es válida" }),
  topic: z.string({ required_error: "Este campo es obligatorio" }).includes('Options', { message: "Este campo es obligatorio" }),
  resourceType: z.string(),
})

type TResourceForm = z.infer<typeof ResourceFormSchema>

const ResourceFormStyled = styled.form`
  ${Radio} {
    margin-top: ${dimensions.spacing.xl};
  }
`

export const ResourceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TResourceForm>({
    resolver: zodResolver(ResourceFormSchema),
  })

  const navigate = useNavigate()
  const urlBE = 'http://localhost:8999/api/v1/auth/resource'

  const registerNewResource  = async (resource: object) => {
    try {
      const response = await axios.post(urlBE, resource)
      if (response.status === 204) {
        navigate('/')
      }
    } catch (error) {
      throw new Error('Error registering new resource')
    }
  }


  const onSubmit = handleSubmit((data) => {
    const { title, description, url, topic, resourceType } = data
    registerNewResource({ title, description, url, topic, resourceType })
    reset()
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
      <SelectGroup
        id="topic"
        label="Tema"
        options={options}
        {...register('topic')}
        name="topic"
        error={errors.topic && true}
        validationMessage={errors.topic?.message}
      />
      <Radio
        {...register('resourceType')}
        options={[
          { id: 'video', label: 'Video' },
          { id: 'curso', label: 'Curso' },
          { id: 'blog', label: 'Blog' },
        ]}
        name="resourceType"
      />
      <FlexErrorStyled align="start">
        {errors?.title || errors?.description || errors?.url ? (
          <ValidationMessage color="error" text="Rellene todos los campos" />
        ) : null}
      </FlexErrorStyled>
      <ButtonContainerStyled align="stretch">
        <ButtonStyled type="submit">Guardar</ButtonStyled>
      </ButtonContainerStyled>
    </ResourceFormStyled>
  )
}
