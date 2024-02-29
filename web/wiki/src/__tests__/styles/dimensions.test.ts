/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest'
import { dimensions } from '../../styles'

describe('dimensions', () => {
  it('should have spacing values that are strings and containing "rem"', () => {
    const { spacing } = dimensions
    Object.entries(spacing).forEach(([_, spacingValue]) => {
      expect(spacingValue).toBeTypeOf('string')
      expect(spacingValue.endsWith('rem')).toBe(true)
    })
  })

  it('should have borderRadius values that are strings', () => {
    const { borderRadius } = dimensions
    Object.entries(borderRadius).forEach(([_, borderRadiusValue]) => {
      expect(borderRadiusValue).toBeTypeOf('string')
    })
  })
})
