import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ResourceForm } from '../components/organisms'
import { Title } from '../components/atoms'
import { paths } from '../constants'

const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Title as="h1">Home 🏡</Title>
      <div>
        <Link to={paths.register}>Register</Link>
      </div>
      <div>
        <Link to={paths.login}>Login</Link>
      </div>

      <button type="button" onClick={openModal}>
        Abrir modal
      </button>
      <ResourceForm isOpen={isOpen} toggleModal={() => setIsOpen(false)} />
    </>
  )
}

export default Home
