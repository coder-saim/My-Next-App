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
import { ResultsModel } from "@/types";
import React, { useEffect, useState } from "react";

export function ResultsTable({results}: any) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = results.slice(firstIndex, lastIndex);
  



  const handleNextPage = () => {
    if (currentPage !== 5) setCurrentPage(currentPage + 1);
    console.log("next" + currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    console.log("prev" + currentPage);
  };

  return (
    <div className={results && results.length === 0 ? 'flex justify-center' : ''}>
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
      ) : results && results.length == 0 ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No Results yet" className="min-h-[120px]">
            Enter a User ID and click submit.
          </MessageBox>
        </DashboardEmptyRow>
      ) : (
        <DashboardTableWrapper>
          <table className="w-full">
            <thead>
              <tr>
                {Object.keys(results[0]).map((keyName,idx) => {
                  return (
                    <DashboardTableHeader key={idx} className="w-[25%] p-4 bg-white text-sm font-medium normal-case text-black">
                      {keyName}
                    </DashboardTableHeader>
                  );
                })}
              </tr>
            </thead>
            <tbody className="relative  divide-y divide-gray-200">
              {records.map((item: any, index: number) => {
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
                        {item.Description}//DescriptionModal
                      </DashboardTableCell>

                      <DashboardTableCell className="w-[20%]">
                        {item.Genre}
                      </DashboardTableCell>

                      <DashboardTableCell className="w-[20%]">
                        {`'${item.Created_at}'`}
                      </DashboardTableCell>

                      <DashboardTableCell className="w-[25%]">
                        {item.Score}
                      </DashboardTableCell>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </DashboardTableWrapper>
      )}

      {!loading ? (
        !error ? (
          results && results.length != 0 ? (
            <>
              <div className="pt-8 pb-6 flex flex-row justify-between">
                <div>Showing {firstIndex+1} to {lastIndex} of {results.length} results</div>
                <div className="flex flex-row space-x-4">
                <Button disabled={firstIndex + 1 === 1 ? true : false}
                    className="bg-white text-black border border-slate-200 hover:bg-white"
                    onClick={handlePrevPage}
                  >
                    Previous
                  </Button>
                  <Button
                  disabled={lastIndex === results.length ? true : false}
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
