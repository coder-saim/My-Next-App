"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { InteractionsUserModel } from "@/types";
import React, { useEffect, useState } from "react";

export function UserInteractionsTable({ userInteractions }: any) {
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userInteractions.slice(firstIndex, lastIndex);


  const handleNextPage = () => {
    if (currentPage < Math.ceil(userInteractions.length/5)) setCurrentPage(currentPage + 1);
    console.log("next" + currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    console.log("prev" + currentPage);
  };

  return (
    <div>
      {loading ? (
        <DashboardEmptyRow colSpan={5}>
          <div className="grid w-full gap-10">
            <Card.Skeleton />
          </div>
        </DashboardEmptyRow>
      ) : error ? (
        <div></div>
      ) : userInteractions && userInteractions.length == 0 ? (
        <div></div>
      ) : (
        <>
          <p className="pt-16 pb-6">Recent Interactions</p>

          <DashboardTableWrapper>
            <table className="w-full">
            <thead>
                <tr>
                  {Object.keys(userInteractions[0]).map((keyName,idx) => {
                    return (
                      <DashboardTableHeader key={idx} className="w-[25%] p-4 bg-white text-sm font-medium normal-case text-black">
                        {keyName}
                      </DashboardTableHeader>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="relative  divide-y divide-gray-200">
                {records.map((item: any, index: any) => {
                  return (
                    <>
                      <tr
                        key={`model_${index}`}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <DashboardTableCell className="w-[20%] p-4">
                          {item.Item_ID}
                        </DashboardTableCell>

                        <DashboardTableCell className="w-[20%] underline">
                          {item.Description}
                        </DashboardTableCell>

                        <DashboardTableCell className="w-[20%]">
                          {item.Genre}
                        </DashboardTableCell>

                        <DashboardTableCell className="w-[25%]">
                          {item.Label}
                        </DashboardTableCell>

                        <DashboardTableCell className="w-[20%]">
                          {`'${item.Timestamp}'`}
                        </DashboardTableCell>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </DashboardTableWrapper>
        </>
      )}


      {!loading ? (
        !error ? (
          userInteractions && userInteractions.length != 0 ? (
            <>
              <div className="pt-8 pb-6 flex flex-row justify-between">
                <div>
                  Showing {firstIndex + 1} to {Math.min(userInteractions.length,lastIndex)} of {userInteractions.length}{" "}
                  results
                </div>
                <div className="flex flex-row space-x-4">
                  <Button
                    disabled={firstIndex + 1 === 1 ? true : false}
                    className="bg-white text-black border border-slate-200 hover:bg-white"
                    onClick={handlePrevPage}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={Math.min(userInteractions.length,lastIndex) === userInteractions.length ? true : false}
                    className="bg-white text-black border border-slate-200 hover:bg-white"
                    onClick={handleNextPage}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}
