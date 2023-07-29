"use client"
import { Organization } from "@/types"
import axios from "./axios-interceptor"

export async function getOrganizationInfo(): Promise<Organization> {
  let organization: any = sessionStorage.getItem("OrganizationInfo")
  if (!organization) {
    let resp = await axios.get(`/api/users/api-key`)

    organization = resp.data.data
    sessionStorage.setItem("OrganizationInfo", JSON.stringify(organization))
  } else organization = JSON.parse(organization)

  return organization
}
