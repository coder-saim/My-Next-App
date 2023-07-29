import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <div className="space-y-3"></div>
    </DashboardShell>
  )
}
