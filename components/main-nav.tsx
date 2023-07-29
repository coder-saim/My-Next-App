"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const path = usePathname()

  const getLinkHref = (item: MainNavItem) => {
    if (item.disabled) return "#"

    const pathElements = path?.split("/")
    if (
      pathElements &&
      pathElements.length >= 2 &&
      (pathElements[1] == "models" || pathElements[1] == "datasets")
    ) {
      pathElements?.pop()
      pathElements?.push(item.href)
      return pathElements?.join("/")
    }

    return item.href
  }

  return (
    <div className="flex flex-col gap-3">
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex w-[6rem] justify-center",
                item.title.toLowerCase() == segment &&
                  "border-b-2 border-violet-600 "
              )}
            >
              <Link
                key={item.title}
                href={getLinkHref(item) as string}
                className={cn(
                  "flex items-center pb-2 text-base font-medium text-slate-900 sm:text-sm",
                  item.href.startsWith(`/${segment}`) && "text-slate-900",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
