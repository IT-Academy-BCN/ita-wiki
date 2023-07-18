// import { fireEvent } from '@testing-library/react'
// import { vi } from 'vitest'
// import { render, screen } from '../test-utils'
// import { AccountAdmin } from '../../pages'

// vi.mock('@tanstack/react-query', () => ({
//   useQuery: vi.fn().mockReturnValue({
//     data: [
//       {
//         id: '1',
//         name: 'John Doe',
//         dni: '12345678',
//         email: 'john.doe@example.com',
//         status: 'ACTIVE',
//       },
//       {
//         id: '2',
//         name: 'Jane Smith',
//         dni: '87654321',
//         email: 'jane.smith@example.com',
//         status: 'INACTIVE',
//       },
//     ],
//     isLoading: false,
//     isError: false,
//   }),
// }))

// describe('AccountAdmin', () => {
//   test('renders the user list', () => {
//     render(<AccountAdmin />)

//     expect(screen.getByText('Lista de usuarios')).toBeInTheDocument()
//     expect(screen.getByLabelText('Buscar por DNI:')).toBeInTheDocument()
//     expect(screen.getByText('Nombre')).toBeInTheDocument()
//     expect(screen.getByText('DNI')).toBeInTheDocument()
//     expect(screen.getByText('Email')).toBeInTheDocument()
//     expect(screen.getByText('Estado')).toBeInTheDocument()
//     expect(screen.getByText('Eliminar usuario')).toBeInTheDocument()

//     expect(screen.getByText('John Doe')).toBeInTheDocument()
//     expect(screen.getByText('12345678')).toBeInTheDocument()
//     expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
//     expect(screen.getByText('ACTIVE')).toBeInTheDocument()
//     expect(screen.getByText('Jane Smith')).toBeInTheDocument()
//     expect(screen.getByText('87654321')).toBeInTheDocument()
//     expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument()
//     expect(screen.getByText('INACTIVE')).toBeInTheDocument()
//   })

//   test('searches users by DNI', () => {
//     render(<AccountAdmin />)

//     const searchInput = screen.getByPlaceholderText('Escribe el DNI')
//     fireEvent.change(searchInput, { target: { value: '1234' } })

//     expect(screen.getByText('John Doe')).toBeInTheDocument()
//     expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()

//     fireEvent.change(searchInput, { target: { value: '' } })

//     expect(screen.getByText('John Doe')).toBeInTheDocument()
//     expect(screen.getByText('Jane Smith')).toBeInTheDocument()
//   })
// })
