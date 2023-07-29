"use client"
import React, { useState } from "react"

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table"
import { MessageBox } from "./message-box"
import { DatasetTableSchema } from "@/types"
import { Icons } from "./icons"

export function DatasetSchemaTable({
  fields,
  idToFieldMapping,
}: DatasetTableSchema) {
  const [_, setTableFields] = useState({})
  const ChevronUpIcon = Icons["chevronUp"]
  const ChevronDownIcon = Icons["chevronDown"]

  const buildTableRowsRecursively = (
    { fields, idToFieldMapping }: DatasetTableSchema,
    depth: number
  ) => {
    const tableRows: any[] = []
    for (const field of fields) {
      const { id, fieldName, fieldType, accordionOpen, nestedFields } = field

      tableRows.push(
        <tr key={`dataset_${id}`} className="cursor-pointer hover:bg-gray-50">
          <DashboardTableCell>
            <div className={`flex w-full justify-between`}>
              <span className={`pl-${depth * 10} font-medium text-gray-900`}>
                {fieldName}
              </span>
              {fieldType == "Struct" && accordionOpen == false && (
                <ChevronDownIcon
                  onClick={() => {
                    idToFieldMapping[id].accordionOpen = true
                    setTableFields({})
                  }}
                  className="h-5 w-5 rounded-sm hover:bg-slate-200"
                />
              )}
              {fieldType == "Struct" && accordionOpen == true && (
                <ChevronUpIcon
                  onClick={() => {
                    idToFieldMapping[id].accordionOpen = false
                    setTableFields({})
                  }}
                  className="h-5 w-5 rounded-sm hover:bg-slate-200"
                />
              )}
            </div>
          </DashboardTableCell>
          <DashboardTableCell className="text-gray-500">
            {fieldType}
          </DashboardTableCell>
        </tr>
      )

      if (accordionOpen) {
        const nestedTableRows = buildTableRowsRecursively(
          {
            fields: nestedFields,
            idToFieldMapping,
          },
          depth + 1
        )
        tableRows.push(...nestedTableRows)
      }
    }

    return tableRows
  }

  return (
    <>
      <DashboardTableWrapper className="w-[50%]">
        <table className="w-full">
          <thead>
            <tr>
              <DashboardTableHeader className="w-[70%] text-sm font-medium capitalize">
                Name
              </DashboardTableHeader>
              <DashboardTableHeader className="w-[30%] text-sm font-medium capitalize">
                Type
              </DashboardTableHeader>
            </tr>
          </thead>

          {fields && fields.length == 0 ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox title="Fetching schema">Check back soon</MessageBox>
            </DashboardEmptyRow>
          ) : (
            <tbody className="relative  divide-y divide-gray-200">
              {buildTableRowsRecursively(
                {
                  fields,
                  idToFieldMapping,
                },
                0
              )}
            </tbody>
          )}
        </table>
      </DashboardTableWrapper>
    </>
  )
}
