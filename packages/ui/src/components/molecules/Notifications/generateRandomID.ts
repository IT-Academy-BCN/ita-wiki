export function generateRandomID() {
  const crypto = window.crypto || window.Crypto
  const array = new Uint32Array(1)
  const id = crypto.getRandomValues(array).toString()
  return id
}
