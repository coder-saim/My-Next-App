import { getServerSession } from "next-auth/next"

import { getAuthOptions } from "@/lib/auth"

export async function getSession() {
  return await getServerSession(getAuthOptions(null, null))
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}
