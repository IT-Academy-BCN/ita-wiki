import { render, screen } from '@testing-library/react'
import { ColumnDef } from '@tanstack/react-table'
import { dimensions } from '@itacademy/ui'
import { Table } from '../../components/molecules'

const testColumns: ColumnDef<
  { name: string; itineraryName: string },
  string
>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nombre',
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'itineraryName',
    header: () => 'Especialización',
    cell: (row) => row.getValue(),
  },
]
const testData = [
  { name: 'Ona Sitgar', itineraryName: 'Node' },
  { name: 'Marc Bofill', itineraryName: 'React' },
]
describe('Table', () => {
  it('renders table header correctly', () => {
    render(
      <Table
        columns={testColumns}
        data={testData}
        noResultsMessage="No data available"
      />
    )

    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Especialización')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toHaveStyle('font-weight: bold;')
    expect(screen.getByText('Especialización')).toHaveStyle(
      `padding-bottom: ${dimensions.spacing.sm};`
    )
  })

  it('renders table rows correctly', () => {
    render(
      <Table
        columns={testColumns}
        data={testData}
        noResultsMessage="No data available"
      />
    )

    expect(screen.getByText('Ona Sitgar')).toBeInTheDocument()
    expect(screen.getByText('Marc Bofill')).toBeInTheDocument()
    expect(screen.getByText('Node')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()

    expect(screen.getByText('Ona Sitgar')).toHaveStyle(
      `padding-bottom: ${dimensions.spacing.xs};`
    )
    expect(screen.getByText('Node')).toHaveStyle('height: 3.1rem;')
  })

  it('renders message when no data is provided', () => {
    const data: [] = []
    render(
      <Table
        columns={testColumns}
        data={data}
        noResultsMessage="No data available"
      />
    )

    expect(screen.getByText('No data available')).toBeInTheDocument()
  })
})
