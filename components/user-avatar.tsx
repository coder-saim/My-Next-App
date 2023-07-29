import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name" | "email">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback className="bg-black bg-gradient-to-b from-amber-900 to-green-800 font-semibold text-white ">
          {user.name
            ? user.name.toUpperCase().charAt(0)
            : user.email?.toUpperCase().charAt(0)}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
