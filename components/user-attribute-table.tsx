"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table";
import { MessageBox } from "./message-box";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export function UserAttrubuteTable({ userAttributes }: any) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={userAttributes && Object.keys(userAttributes).length === 0 ? 'flex justify-center' : ''}> 
     
      {loading ? (
        <DashboardEmptyRow colSpan={5}>
          <div className="grid w-full gap-10">
            <Card.Skeleton />
          </div>
        </DashboardEmptyRow>
      ) : error ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox
            title="Something went wrong"
            subtitle="Error occured while fetching models"
          />
        </DashboardEmptyRow>
      ) : userAttributes && Object.keys(userAttributes).length === 0 ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No Data yet" className="min-h-[120px]">
            Enter a User ID and click submit.
          </MessageBox>
        </DashboardEmptyRow>
      ) : (
        <>
          <p className=" pb-6">Attributes</p>
          <DashboardTableWrapper>
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(userAttributes).map((keyName,idx) => {
                    return (
                      <DashboardTableHeader key={idx} className="w-[25%] p-4 bg-white text-sm font-medium normal-case text-black">
                        {keyName}
                      </DashboardTableHeader>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="relative  divide-y divide-gray-200">
                <tr className="cursor-pointer hover:bg-gray-50">
                  {Object.values(userAttributes).map(
                    (item: any, index: number) => {
                      return (
                        <DashboardTableCell key={index} className="w-[20%] p-4">
                          {item}
                        </DashboardTableCell>
                      );
                    }
                  )}
                </tr>
              </tbody>
            </table>
          </DashboardTableWrapper>
        </>
      )}
    </div>
  );
}
