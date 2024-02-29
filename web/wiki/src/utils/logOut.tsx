import { urls } from '../constants'

export const logOut = async (navigate: (path: string) => void, to: string): Promise<void> => {
  await fetch(urls.logOut);
  navigate(to);
  window.location.reload();
}