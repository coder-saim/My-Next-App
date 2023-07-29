import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "Shaped",
  description: "Shaped App",
  url: process.env.NEXT_PUBLIC_APP_URL || "",
  ogImage: "/shaped-cube.png",
}
