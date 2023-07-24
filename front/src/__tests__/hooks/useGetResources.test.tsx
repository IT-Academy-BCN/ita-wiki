import { QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "../test-utils"
import { queryClient } from '../setup'
import { useGetResources } from "../../hooks"

describe('useGetResources', () => {
  it("gets an object with user's resources", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetResources(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toHaveLength(1)
  })
})