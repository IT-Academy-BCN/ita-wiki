import { colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { icons } from '../../assets/icons'
import { IconStyled } from '../organisms/UsersTable/UsersTable.styles'

const TableStyled = styled.table`
  width: 100%;
  color: ${colors.black.black3};
  font-size: ${font.xs};
  font-weight: ${font.regular};
`

const TRStyled = styled.tr<{ isDeleted?: boolean }>`
  opacity: ${({ isDeleted }) => (isDeleted ? 0.6 : 1)};
`

const THeadStyled = styled.thead`
  text-align: left;
  font-weight: ${font.bold};
`

const THStyled = styled.th`
  padding-bottom: ${dimensions.spacing.sm};
  width: auto;
  cursor: pointer;
`

const TBodyStyled = styled.tbody``

const TDStyled = styled.td`
  padding-bottom: ${dimensions.spacing.xs};
  height: 3.1rem;
`

export type TTable<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  noResultsMessage: string
}

export const Table = <TData, TValue>({
  columns,
  data,
  noResultsMessage,
}: TTable<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <TableStyled>
      <THeadStyled>
        {table.getHeaderGroups().map((headerGroup) => (
          <TRStyled key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THStyled
                key={header.id}
                data-testid={`sort-${header.id}`}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: <IconStyled src={icons.sortUp} alt="sortUp" />,
                  desc: <IconStyled src={icons.sortDown} alt="sortDown" />,
                }[header.column.getIsSorted() as string] ?? null}
              </THStyled>
            ))}
          </TRStyled>
        ))}
      </THeadStyled>
      <TBodyStyled>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const { deletedAt } = row.original as { deletedAt: string }
            const { id } = row.original as { id: string }
            return (
              <TRStyled
                key={row.id}
                isDeleted={deletedAt !== null}
                data-testid={id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TDStyled key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TDStyled>
                ))}
              </TRStyled>
            )
          })
        ) : (
          <TRStyled>
            <TDStyled colSpan={columns.length}>{noResultsMessage}</TDStyled>
          </TRStyled>
        )}
      </TBodyStyled>
    </TableStyled>
  )
}
