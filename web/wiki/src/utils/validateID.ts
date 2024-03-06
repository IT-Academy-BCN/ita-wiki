// NIEs validation included
export function validateID(dni: string) {
  let number: number
  let letter: string
  const expressionRegularDNI = /^[XYZ]?\d{5,8}[A-Z]$/

  const DNI = dni.toUpperCase()

  if (expressionRegularDNI.test(DNI) === true) {
    number = parseInt(
      dni
        .slice(0, dni.length - 1)
        .replace('X', '0')
        .replace('Y', '1')
        .replace('Z', '2'),
      10
    )
    letter = DNI.slice(-1)
    number %= 23
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKET'
    const correctLetter = letters.substring(number, number + 1)

    if (letter !== correctLetter) {
      return {
        error: true,
        message: 'Wrong NIF/NIE, the letter does not correspond',
      }
    }
    return {
      error: false,
      message: 'Correct NIF/NIE',
    }
  }
  return {
    error: true,
    message: 'Wrong NIF/NIE, invalid format',
  }
}
