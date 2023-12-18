import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// const AllTheProviders = ({
//   children,
//   initialEntries,
// }: {
//   children: React.ReactNode
//   initialEntries?: string[]
// }) => (
//   <AuthProvider>
//     <NotificationsProvider>
//       <QueryClientProvider client={queryClient}>
//         <I18nextProvider i18n={i18n}>
//           <MemoryRouter initialEntries={initialEntries}>
//             {children}
//           </MemoryRouter>
//         </I18nextProvider>
//       </QueryClientProvider>
//     </NotificationsProvider>
//   </AuthProvider>
// )

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: string[] }
) => {
  const { initialEntries, ...restOptions } = options ?? {}
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} initialEntries={initialEntries} />
    ),
    ...restOptions
  })
}

export * from '@testing-library/react'
export { customRender as render }
