export const isValidDNILetter = (dni: string) => {
  const letterMap = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const numericValue = dni
    .substring(0, dni.length - 1)
    .replace(/[XYZ]/i, (match) => {
      const replacementMap: { [key: string]: string } = {
        X: '0',
        Y: '1',
        Z: '2',
      }
      const replacement = replacementMap[match.toUpperCase()] ?? match
      return replacement
    })
  const providedLetter = dni.slice(-1)
  const position = parseInt(numericValue, 10) % 23
  return providedLetter === letterMap.charAt(position)
}
