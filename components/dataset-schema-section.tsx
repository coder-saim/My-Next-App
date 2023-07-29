"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { DatasetSchemaTable } from "./dataset-schema-table"
import { DatasetTableField } from "@/types"
import { v4 as uuid } from "uuid"

interface SchemaSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  datasetSchema: any
}

function buildTableFields(
  datasetSchema,
  idToFieldMapping: Record<number, DatasetTableField>
): DatasetTableField[] {
  return Object.entries(datasetSchema).map(([k, v]) => {
    const field = {
      id: uuid(),
      fieldName: k,
      fieldType: typeof v === "object" && v !== null ? "Struct" : v,
      accordionOpen: false,
      nestedFields: [],
    } as DatasetTableField

    if (field.fieldType === "Struct")
      field["nestedFields"] = buildTableFields(v, idToFieldMapping)

    idToFieldMapping[field.id] = field
    return field
  })
}

export function DatasetSchemaSection({
  datasetSchema,
  className,
  children,
  ...props
}: SchemaSectionProps) {
  const fields: [DatasetTableField[], Record<number, DatasetTableField>] =
    React.useMemo(() => {
      const idToFieldMapping: Record<number, DatasetTableField> = {}
      const tableFields: DatasetTableField[] = buildTableFields(
        datasetSchema,
        idToFieldMapping
      )
      return [tableFields, idToFieldMapping]
    }, [datasetSchema])

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
        <DatasetSchemaTable fields={fields[0]} idToFieldMapping={fields[1]} />
      </div>
    </div>
  )
}
