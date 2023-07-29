import { notFound } from "next/navigation"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import Link from "next/link"
import ShapedLogo from "@/components/shaped-logo"
import axios from "axios"
import { HeaderSection } from "@/components/header-section"

interface DetailsLayoutProps {
  children?: React.ReactNode
  params: { datasetName: string }
}

export default async function DetailsLayout({
  children,
  params,
}: DetailsLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  let organization = {} as any
  const getUserOrganization = async () => {
    try {
      const resp = await axios.get(
        `${process.env.SHAPED_PRIVATE_API_URL}/organization`,
        {
          params: {
            email: user.email,
          },
        }
      )

      organization = resp.data
    } catch (error) {
      console.log(
        `Error while checking if we want to show admin page: ${error}`
      )
    }
  }

  await getUserOrganization()

  return (
    <div className="mx-auto ml-[calc(100vw-100%)] flex flex-col space-y-6">
      <div>
        <HeaderSection
          organizationName={organization.name}
          user={user}
          navs={dashboardConfig.datasetsNav}
          datasetName={params.datasetName}
        />
        <div className="-ml-5 border-b border-b-slate-400"></div>
      </div>
      <div className="container  md:grid-cols-[200px_1fr]">
        <main className="flex w-full flex-1 flex-col overflow-hidden px-5 py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
