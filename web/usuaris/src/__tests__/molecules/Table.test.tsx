import { render, screen, within, waitFor } from '@testing-library/react'
import { ColumnDef } from '@tanstack/react-table'
import { dimensions } from '@itacademy/ui'
import { fireEvent } from '../test-utils'
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

  it('sorts columns correctly', async () => {
    render(
      <Table
        columns={testColumns}
        data={testData}
        noResultsMessage="No data available"
      />
    )

    fireEvent.click(screen.getByTestId('sort-name'))

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1)

      expect(within(rows[0]).getByText('Marc Bofill')).toBeInTheDocument()
      expect(within(rows[1]).getByText('Ona Sitgar')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('sort-name'))

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1)

      expect(within(rows[0]).getByText('Ona Sitgar')).toBeInTheDocument()
      expect(within(rows[1]).getByText('Marc Bofill')).toBeInTheDocument()
    })
  })
})
