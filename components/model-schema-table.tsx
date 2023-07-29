"use client"
import React from "react"

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table"
import { MessageBox } from "./message-box"
import { ModelTableSchema } from "@/types"

const requiredFields = ["user_id", "item_id", "label", "created_at"]

export function ModelSchemaTable({ name, features }: ModelTableSchema) {
  return (
    <>
      <DashboardTableWrapper>
        <table className="w-full">
          <thead>
            <tr>
              <DashboardTableHeader
                className="text-center text-base font-semibold capitalize text-black "
                colSpan={2}
              >
                {name}
              </DashboardTableHeader>
            </tr>
          </thead>

          {features && features.length == 0 ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox title="Fetching schema">Check back soon</MessageBox>
            </DashboardEmptyRow>
          ) : (
            <tbody className="relative  divide-y divide-gray-200">
              {features.map((item, index) => (
                <tr
                  key={`dataset_${index}`}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <DashboardTableCell
                    className={`w-[20%] ${
                      requiredFields.includes(item.name)
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {item.name}
                  </DashboardTableCell>
                  <DashboardTableCell className="w-[20%]">
                    {item.type}
                  </DashboardTableCell>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </DashboardTableWrapper>
    </>
  )
}
