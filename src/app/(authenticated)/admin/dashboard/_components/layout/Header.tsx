"use client"

import { usePathname } from "next/navigation"

export function Header() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

  const title = segments.at(-1) ?? "dashboard"

  return (
    <div className="border-b px-6 py-4">
      <h1 className="text-xl font-semibold capialize">{decodeURIComponent(title)}</h1>
    </div>
  )
}