import { ResourceForm } from '../components/organisms'

const AddResource = () => (
  <div>
    <ResourceForm
      selectOptions={[
        {
          value: 'cli04uxud000609k37w9phejw',
          label: 'Renderizado condicional',
        },
        { value: 'cli04ut8j000509k389fv899t', label: 'Eventos' },
      ]}
    />
  </div>
)

export { AddResource }
