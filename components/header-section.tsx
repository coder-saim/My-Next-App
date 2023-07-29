import Link from "next/link"
import ShapedLogo from "./shaped-logo"
import { UserAccountNav } from "./user-account-nav"
import { MainNav } from "./main-nav"
import { User } from "next-auth"
import { NavItem } from "@/types"

interface HeaderSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  organizationName: string
  modelName?: string
  datasetName?: string
  user: User
  navs: NavItem[]
}

export function HeaderSection({
  organizationName,
  modelName,
  datasetName,
  navs,
  user,
}: HeaderSectionProps) {
  return (
    <header className="container  top-0 z-40 bg-white">
      <div className="mt-3 flex h-[75px] items-center justify-between">
        <div className="-ml-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ShapedLogo />
            <span className="text-sm font-medium">
              {organizationName ?? ""}
            </span>
          </Link>
          <span className="text-sm font-medium">
            {modelName && <>&nbsp;/&nbsp;{modelName}</>}
            {datasetName && <>&nbsp;/&nbsp;{datasetName}</>}
          </span>
        </div>
        <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        />
      </div>
      <div className="mt-1">
        <MainNav items={navs} />
      </div>
    </header>
  )
}
