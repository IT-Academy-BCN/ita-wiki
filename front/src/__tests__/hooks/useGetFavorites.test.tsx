import { setupServer } from 'msw/node';
import { renderHook } from "../test-utils"
import { handlers } from '../../__mocks__/handlers';
import { useGetFavorites } from "../../hooks"

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('useGetFavorites', () => {
  it("gets an array of user's favorite resources", async () => {
    const { result } = renderHook(useGetFavorites)
    expect(result.current.data).toHaveLength(0)
  })
})