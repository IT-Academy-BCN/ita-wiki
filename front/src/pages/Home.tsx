import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../components/atoms'
import { paths } from '../constants'
import { TextareaGroup } from '../components/molecules'

const Home: FC = () => (
  <>
    <Title as="h1">Home 🏡</Title>
    <div>
      <Link to={paths.register}>Register</Link>
    </div>
    <div>
      <Link to={paths.login}>Login</Link>
    </div>
    <div>
      <Link to={paths.resource}>Resource</Link>
    </div>
    <TextareaGroup
      id="prueba"
      name="textarea"
      label="textarea"
      rows={10}
      validationMessage="Está mal"
      validationType="error"
    />
  </>
)

export default Home
