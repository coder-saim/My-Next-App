import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/dashboard/home",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  modelsNav: [
    {
      title: "Overview",
      href: "overview",
    },
    {
      title: "Metrics",
      href: "metrics",
    },
    {
      title: "Rank",
      href: "rank",
    },
  ],
  datasetsNav: [
    {
      title: "Overview",
      href: "/overview",
    },
  ],
  settingSidebarNav: [
    {
      title: "General",
      href: "/dashboard/settings",
      icon: "building",
    },
    {
      title: "Members",
      href: "/dashboard/settings/members",
      icon: "users",
    },
    {
      title: "API Key",
      href: "/dashboard/settings/api-key",
      icon: "key",
    },
    {
      title: "Billing",
      href: "/dashboard/settings/billing",
      icon: "billing",
    },
  ],
  adminSidebarNav: [
    {
      title: "Admin",
      href: "/dashboard/admin",
    },
  ],
}
