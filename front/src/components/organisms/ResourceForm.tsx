/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { Modal, InputGroup, SelectGroup } from '../molecules'
import { Button, ValidationMessage } from '../atoms'
import { FlexBox, dimensions } from '../../styles'

const ResourceFormSchema = z.object({
  description: z.string(),
  title: z.string(),
  topic: z.string(),
  url: z.string(),
})

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

const CheckBoxStyled = styled(FlexBox)`
  gap: 2rem;
  margin-top: 2rem;
`

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

type TResourceForm = {
  description: string
  isOpen: boolean
  title: string
  toggleModal: () => void
  topic: string
  url: string
}

const ResourceForm = ({ isOpen, toggleModal }: TResourceForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResourceForm>({
    resolver: zodResolver(ResourceFormSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Modal title="Nuevo Recurso" isOpen={isOpen} toggleModal={toggleModal}>
      <form onSubmit={onSubmit}>
        <InputGroup
          hiddenLabel
          id="title"
          label="Título"
          placeholder="Título"
          {...register('title')}
          name="title"
          error={errors.title && true}
        />
        <InputGroup
          hiddenLabel
          id="description"
          label="Descripción"
          placeholder="Descripción"
          {...register('description')}
          name="description"
          error={errors.description && true}
        />
        <InputGroup
          hiddenLabel
          id="url"
          label="URL"
          placeholder="URL"
          {...register('url')}
          name="url"
          error={errors.url && true}
        />
        <SelectGroup
          id="topic"
          label="Tema"
          options={options}
          {...register('topic')}
          name="topic"
          error={errors.topic && true}
        />
        <CheckBoxStyled direction="row">
          <input type="checkbox" value="video" id="video" />
          <label htmlFor="video">Video</label>
          <input type="checkbox" value="curso" id="curso" />
          <label htmlFor="curso">Curso</label>
          <input type="checkbox" value="blog" id="blog" />
          <label htmlFor="blog">Blog</label>
        </CheckBoxStyled>
        <FlexErrorStyled align="start">
          {errors?.title || errors?.description || errors?.url ? (
            <ValidationMessage color="error" text="Rellene todos los campos" />
          ) : null}
        </FlexErrorStyled>
        <ButtonContainerStyled align="stretch">
          <ButtonStyled>Editar</ButtonStyled>
          <ButtonStyled>Cancelar</ButtonStyled>
        </ButtonContainerStyled>
      </form>
    </Modal>
  )
}

export { ResourceForm }
