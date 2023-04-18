import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../components/atoms'
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
  </>
)

export default Home
