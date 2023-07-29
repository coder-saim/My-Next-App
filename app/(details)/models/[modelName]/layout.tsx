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
  params: { modelName: string }
}

export default async function DetailsLayout({
  children,
  params,
}: DetailsLayoutProps) {
  

  return (
    <div className="mx-auto ml-[calc(100vw-100%)] flex flex-col space-y-6">
      <div>
        <HeaderSection
          organizationName={'saim'}
          user={'null'}
          navs={dashboardConfig.modelsNav}
          modelName={params.modelName}
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
