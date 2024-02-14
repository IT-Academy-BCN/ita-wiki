import { FC } from 'react'
import { Avatar } from '../atoms'
import { dimensions } from '../../styles'

export type TUser = {
    id?: string
    name: string
    avatarId: string
    email?: string
    role?: 'ADMIN' | 'REGISTERED' | 'MENTOR'
} | null
export type TUserButton = {
    onClick: () => void
    user: TUser 
    children?: React.ReactNode
    avatarRef?: React.RefObject<HTMLImageElement>
}
export const UserButton: FC<TUserButton> = ({ onClick, user, children, avatarRef }) =>

(
        <>
            {!user && (
                <Avatar
                    data-testid="avatarImage"
                    src={undefined}
                    alt="Avatar"
                    onClick={onClick}
                    forwardedRef={avatarRef}
                    width={40}
                    height={40}
                    borderRadius={dimensions.borderRadius.sm}
                />
            )}
            {user && (
                <Avatar
                    data-testid="avatarImageUser"
                src={user.avatarId ? user.avatarId : undefined}
                    alt="Avatar"
                    onClick={() => onClick}
                    forwardedRef={avatarRef}
                    width={40}
                    height={40}
                    borderRadius={dimensions.borderRadius.sm}
                />
            )}
            {children}
        </>
    )

