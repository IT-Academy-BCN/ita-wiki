import { fetchGetLogout } from '../openapi/openapiComponents'

export const logOut = async (
  navigate: (path: string) => void,
  to: string
): Promise<void> => {
  await fetchGetLogout({})
  navigate(to)
  window.location.reload()
}
