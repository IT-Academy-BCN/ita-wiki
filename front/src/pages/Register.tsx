/* eslint-disable no-nested-ternary */
import { FC, useState } from 'react'
import { Input, Title } from '../components/atoms'
import InputGroup from '../components/molecules/InputGroup'

const Register: FC = () => {
  const [password, setPassword] = useState('')
  const { length } = password
  const validationTypeCondition =
    length < 4
      ? 'error'
      : length > 9
      ? 'success'
      : length === 6
      ? 'warning'
      : undefined
  const validationTypeMessage =
    length > 0 && length < 4
      ? 'too short'
      : length > 9
      ? 'muy bien!'
      : length === 6
      ? 'hola'
      : ''

  return (
    <div>
      <Title as="h1">Register 👋</Title>
      <div
        style={{
          margin: '10px',
          marginBottom: '70px',
        }}
      >
        <Title as="h2">DEMO</Title>
        <InputGroup
          label="hola"
          value={password}
          icon="search"
          onChange={(e) => setPassword(e.target.value)}
          id="demo"
          placeholder="escribe algo"
          success={length > 8}
          error={length > 0 && length < 4}
          warning={length === 6}
          validationType={validationTypeCondition}
          validationMessage={validationTypeMessage}
        />
      </div>
      <hr />
      <hr />
      <hr />
      <Input
        name="input name"
        placeholder="simple input"
        onChange={() => console.log('hola')}
      />
      <div>
        <InputGroup
          id="id0"
          placeholder="simple inputGroup"
          onChange={() => console.log('hola')}
        />
        <InputGroup
          onChange={() => console.log('hola')}
          type="password"
          id="id1"
          placeholder="type password"
          success
          validationType="success"
          validationMessage="todo ha ido bien!"
        />
        <InputGroup
          id="id2"
          hiddenLabel={false}
          label="Label visible, hiddenLabel={false}"
          placeholder="hola"
          warning
          validationType="warning"
          validationMessage="warning message"
        />
        <InputGroup
          id="id3"
          placeholder="mundo"
          error
          validationType="error"
          validationMessage="error message"
        />
      </div>
    </div>
  )
}
export default Register
