import { render } from '@testing-library/react'
import { CreateAuthor } from '../../components/molecules/index'

describe('CreateAuthor', () => {
  it('renders correctly', () => {
    render(
      <CreateAuthor
        createdBy="Author Test"
        createdOn="2022-08-09T09:42:25.717Z"
      />
    )
  })
})
