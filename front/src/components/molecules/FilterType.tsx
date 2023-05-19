import { FC, useState, useRef } from 'react'
import styled from 'styled-components'
import { CheckBox } from '../atoms'

type Test = {
  id: string
  label: string
}

const tests: Test[] = [
  { id: 'test1', label: 'test1' },
  { id: 'test2', label: 'test2' },
]

export const FilterType: FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>('')

  const test1 = useRef<HTMLInputElement>(null)
  const test2 = useRef<HTMLInputElement>(null)

  // if (test !== null) {console.log('test1', test1?.current?.checked?)}

  const readCheck = () => {}

  return (
    <>
      <CheckBox id="test1" label="test1" ref={test1} onChange={readCheck()} />
      <CheckBox id="test2" label="test2" ref={test2} />
      <p> {test1?.current?.checked ? 'test1 sí' : 'test 1 no'}</p>
      {test2?.current?.checked ? 'test2 sí' : 'test 2 no'}
      <p>{selectedTest}</p>
    </>
  )
}
