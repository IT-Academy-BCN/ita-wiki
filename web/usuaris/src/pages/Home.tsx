import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import {
  FiltersWidget,
  Login,
  Navbar,
  SideMenu,
  UsersTable,
} from '../components/organisms'
import { useAuth } from '../context/AuthProvider'
import { TFilters, TUpdatedUsersStatus, UserStatus } from '../types'
import {
  ActionsDropdown,
  DeleteConfirmationModal,
} from '../components/molecules'
import { useUpdateUsersStatus } from '../hooks'

const Container = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xxxl}
    ${dimensions.spacing.xl} ${dimensions.spacing.sm};
`

const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 100%;
`

const MainDiv = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  padding: ${dimensions.spacing.lg} ${dimensions.spacing.xxxl};
  border-radius: ${dimensions.borderRadius.base};
  color: ${colors.gray.gray3};
`

const ContainerFiltersActions = styled(FlexBox)`
  width: 100%;
`

const LoginContainer = styled(FlexBox)`
  width: 50%;
  height: auto;
  background-color: ${colors.white};
  padding: ${dimensions.spacing.lg} 6rem;
  border-radius: ${dimensions.borderRadius.sm};
`

export const Home: FC = () => {
  const { user } = useAuth()
  const { changeUsersStatus, isSuccess: statusSuccess } = useUpdateUsersStatus()

  const [filters, setFilters] = useState<TFilters>({})
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | undefined>(
    undefined
  )
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isActionFinished, setIsActionFinished] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleSelectedUsers = (users: string[]) => {
    setSelectedUsers(users)
  }

  const handleAction = (action: string | undefined) => {
    setIsActionFinished(false)
    if (action && action !== 'DELETE') {
      const updatedUsersStatus: TUpdatedUsersStatus = {
        ids: selectedUsers,
        status: action,
      }
      changeUsersStatus.mutate(updatedUsersStatus)
    } else {
      setIsModalOpen(!isModalOpen)
    }
  }

  useEffect(() => {
    if (statusSuccess) {
      setSelectedStatus(undefined)
      setIsActionFinished(true)
    }
  }, [statusSuccess])

  if (!user)
    return (
      <Container
        direction="column"
        align="center"
        justify="flex-start"
        gap={dimensions.spacing.sm}
      >
        <Navbar />
        <LoginContainer>
          <Login />
        </LoginContainer>
      </Container>
    )

  return (
    <>
      <Container direction="row" align="center">
        <SideMenu />
        <ContainerMain justify="flex-start">
          <Navbar />
          <MainDiv
            as="main"
            justify="flex-start"
            align="center"
            gap={dimensions.spacing.xxl}
          >
            <ContainerFiltersActions
              direction="row"
              align="start"
              justify="space-between"
              gap={dimensions.spacing.xs}
            >
              <FiltersWidget filters={filters} setFilters={setFilters} />
              <ActionsDropdown
                selectedStatus={selectedStatus}
                handleAction={handleAction}
                isActionFinished={isActionFinished}
              />
            </ContainerFiltersActions>
            <UsersTable
              filtersSelected={filters}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleSelectedUsers={handleSelectedUsers}
            />
          </MainDiv>
        </ContainerMain>
      </Container>
      <DeleteConfirmationModal
        open={isModalOpen}
        toggleModal={() => {
          setIsModalOpen(false)
          setSelectedStatus(undefined)
          setIsActionFinished(true)
        }}
        idsToDelete={selectedUsers}
      />
    </>
  )
}
