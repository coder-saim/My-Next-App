"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { ModelDetails } from "@/types"
import { useState } from "react"
import { ModelSchemaTable } from "./model-schema-table"

interface SchemaSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  modelDetails: ModelDetails
}

export function SchemaSection({
  modelDetails,
  className,
  children,
  ...props
}: SchemaSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start rounded-md border border-solid p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      <div className="flex">
        <h2 className={cn("text-xl font-semibold")}>Schema</h2>
      </div>
      <div className="mt-4 flex w-full justify-between space-x-6">
        <ModelSchemaTable
          name="User"
          features={modelDetails.model_schema.user}
        />
        <ModelSchemaTable
          name="Item"
          features={modelDetails.model_schema.item}
        />
        <ModelSchemaTable
          name="Interaction"
          features={modelDetails.model_schema.interaction}
        />
      </div>
    </div>
  )
}
