import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Modal, InputGroup, SelectGroup } from '../molecules'
import { Button } from '../atoms'
import { dimensions } from '../../styles'

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  width: 100%;
`

type TResourceForm = {
  isOpen: boolean
  toggleModal: () => void
}

export const ResourceForm = ({ isOpen, toggleModal }: TResourceForm) => (
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(),
  })


  <Modal title="Nuevo Recurso" isOpen={isOpen} toggleModal={toggleModal}>
    <StyledForm>
      <InputGroup
        label="Título"
        hiddenLabel
        id="title"
        name="title"
        placeholder="Título"
      />
      <InputGroup
        label="Descripción"
        hiddenLabel
        id="description"
        name="description"
        placeholder="Descripción"
      />
      <InputGroup
        label="URL"
        hiddenLabel
        id="url"
        name="url"
        placeholder="URL"
      />
      <SelectGroup id="topic" name="topic" label="tema" options={options} />
      <Button>Editar</Button>
      <Button>Cancelar</Button>
    </StyledForm>
  </Modal>
)
