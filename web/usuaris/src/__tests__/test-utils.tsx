import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import { queryClient } from './setup'
import { AuthProvider } from '../context/AuthProvider'

const AllTheProviders = ({
  children,
  initialEntries,
}: {
  children: React.ReactNode
  initialEntries?: string[]
}) => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>
  </AuthProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: string[] }
) => {
  const { initialEntries, ...restOptions } = options ?? {}
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} initialEntries={initialEntries} />
    ),
    ...restOptions,
  })
}

export * from '@testing-library/react'
export { customRender as render }
