import { validateID } from '../../utils/validateID'

describe('validateID', () => {
  it('returns valid for a valid DNI', () => {
    const result = validateID('12345678Z')
    expect(result).toEqual({
      error: false,
      message: 'Correct NIF/NIE',
    })
  })

  it('returns valid for a valid DNI with lowercase letter', () => {
    const result = validateID('12345678z')
    expect(result).toEqual({
      error: false,
      message: 'Correct NIF/NIE',
    })
  })

  it('returns valid for a valid NIE', () => {
    const result = validateID('Y0124165W')
    expect(result).toEqual({
      error: false,
      message: 'Correct NIF/NIE',
    })
  })

  it('returns valid for a valid NIE with lowercase letter', () => {
    const result = validateID('y0124165w')
    expect(result).toEqual({
      error: true,
      message: 'Wrong NIF/NIE, the letter does not correspond',
    })
  })

  it('returns invalid for a valid DNI', () => {
    const result = validateID('12345678P')
    expect(result).toEqual({
      error: true,
      message: 'Wrong NIF/NIE, the letter does not correspond',
    })
  })

  it('returns invalid for an invalid DNI with incorrect format', () => {
    const result = validateID('12345678ZZ')
    expect(result).toEqual({
      error: true,
      message: 'Wrong NIF/NIE, invalid format',
    })
  })
})
