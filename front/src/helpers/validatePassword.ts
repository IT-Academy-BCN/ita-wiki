export function validatePassword(password: string): boolean {
  return /^(?=[a-zA-Z0-9]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*/.test(
    password
  )
}
