// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// NIEs validation included
export function validateID(dni: string) {
  let number
  let letter
  const expressionRegularDNI = /^[XYZ]?\d{5,8}[A-Z]$/

  const DNI = dni.toUpperCase()

  if (expressionRegularDNI.test(DNI) === true) {
    number = dni.slice(0, dni.length - 1)
    number = number.replace('X', 0)
    number = number.replace('Y', 1)
    number = number.replace('Z', 2)
    letter = DNI.slice(-1)
    number %= 23
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKET'
    const correctLetter = letters.substring(number, number + 1)
    if (letter !== correctLetter) {
      return {
        error: true,
        message: 'Wrong ID, the letter of the NIF does not correspond',
      }
    }
    return {
      error: false,
      message: 'Correct ID',
    }
  }
  return {
    error: true,
    message: 'Wrong ID, invalid format',
  }
}
