import { Modal, InputGroup, SelectGroup } from '../molecules'
import { Button } from '../atoms'

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

type TResourceForm = {
  isOpen: boolean
  toggleModal: () => void
}

export const ResourceForm = ({ isOpen, toggleModal }: TResourceForm) => (
  <Modal title="Nuevo Recurso" isOpen={isOpen} toggleModal={toggleModal}>
    <form>
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
    </form>
  </Modal>
)
