import { render, screen, fireEvent } from '../test-utils'
import { EditResource } from '../../components/organisms'

test('Renders EditResource when resource is editable', () => {
  const props = {
    description: 'Sample description',
    id: '1',
    title: 'Sample title',
    url: 'https://example.com',
    resourceType: 'Sample resource type',
    topics: [],
    editable: true,
  }

  render(<EditResource {...props} />)

  expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
  const editIcon = screen.getByTestId('edit-icon')

  fireEvent.click(editIcon)

  expect(screen.getByTestId('resource-form')).toBeInTheDocument()
  expect(screen.getByLabelText(/descripció/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/títol/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
})
