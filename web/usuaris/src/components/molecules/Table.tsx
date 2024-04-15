import { colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const TableStyled = styled.table`
  width: 100%;
  color: ${colors.black.black3};
  font-size: ${font.xs};
  font-weight: ${font.regular};
`

const TRStyled = styled.tr``

const THeadStyled = styled.thead`
  text-align: left;
  font-weight: ${font.bold};
`

const THStyled = styled.th`
  padding-bottom: ${dimensions.spacing.sm};
  width: auto;
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
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableStyled>
      <THeadStyled>
        {table.getHeaderGroups().map((headerGroup) => (
          <TRStyled key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THStyled key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </THStyled>
            ))}
          </TRStyled>
        ))}
      </THeadStyled>
      <TBodyStyled>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TRStyled key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TDStyled key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TDStyled>
              ))}
            </TRStyled>
          ))
        ) : (
          <TRStyled>
            <TDStyled>{noResultsMessage}</TDStyled>
          </TRStyled>
        )}
      </TBodyStyled>
    </TableStyled>
  )
}
