import * as React from "react"

import { Card } from "./ui/card"

interface StatusBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  elapsedTime?: string
  totalElapsedTime?: string
}

export function StatusBanner({
  title,
  description,
  elapsedTime,
  totalElapsedTime,
  className,
  children,
  ...props
}: StatusBannerProps) {
  return (
    <Card className="bg-gray-900 text-white">
      <Card.Header>
        <div className="flex justify-between">
          <div>
            <Card.Title className="font-bold ">{title}</Card.Title>
            <Card.Description className="mt-1 text-white">
              {description}
            </Card.Description>
          </div>
        </div>
      </Card.Header>
    </Card>
  )
}
