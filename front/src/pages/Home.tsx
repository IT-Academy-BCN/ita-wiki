import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Title, Textarea } from '../components/atoms'
import { paths } from '../constants'

const Home: FC = () => (
  <>
    <Title as="h1">Home 🏡</Title>
    <div>
      <Link to={paths.register}>Register</Link>
    </div>
    <div>
      <Link to={paths.login}>Login</Link>
    </div>
    <div style={{ padding: '1rem' }}>
      <Textarea rows={15} cols={0} />
    </div>
  </>
)

export default Home
