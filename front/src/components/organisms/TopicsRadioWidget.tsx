import { FC } from 'react'
import { Radio } from '../atoms'

const dataSubjects = [
  { id: '1', label: 'Primeros pasos' },
  { id: '2', label: 'Components' },
  { id: '3', label: 'useState y useEffect' },
  { id: '4', label: 'Eventos' },
  { id: '5', label: 'Renderizado condicional' },
  { id: '6', label: 'Listas' },
  { id: '7', label: 'Estilos' },
  { id: '8', label: 'Debuggin' },
  { id: '9', label: 'React Router' },
  { id: '10', label: 'Hooks' },
  { id: '11', label: 'Context API' },
  { id: '12', label: 'Redux' },
  { id: '13', label: 'Proyectos' },
  { id: '14', label: 'Testing' },
]

export const TopicsRadioWidget: FC = () => {
  console.log(dataSubjects)

  return (
    <>
      <h2>RADIO WIDGETT</h2>
      <Radio options={dataSubjects} name="Topics Radio Filter" />
    </>
  )
}
