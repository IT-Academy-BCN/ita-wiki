let lastId = 0
export const newId = (prefix = 'generated') => {
  lastId += 1
  return `${prefix}${lastId}`
}
