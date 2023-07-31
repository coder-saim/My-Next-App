"use client";

import { DashboardTableWrapper } from "@/components/dashboard-table";
import { ResultsTable } from "@/components/results-table";
import { DashboardShell } from "@/components/shell";
import TitleInfo from "@/components/title-info";
import { Button } from "@/components/ui/button";
import { UserAttrubuteTable } from "@/components/user-attribute-table";
import { UserInteractionsTable } from "@/components/user-interactons-table";
import { AttributesUserModel, InteractionsUserModel,ResultsModel } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userAttributes, setUserAttributes] = useState<AttributesUserModel>(
    {} as any
  ); //userAttributes
  const [userInteractions, setUserInteractions] = useState<
    Array<InteractionsUserModel>
  >([]);

  const [results, setResults] = useState<Array<ResultsModel>>([]);


  const [userID, setUserID] = useState('')

  
  // useEffect(() => {
  //   async function getAttributesModels() {
  //     try {
  //       setUserAttributes({
  //         professionID: "Nurse",
  //         location: "USA",
  //         average_session: 24,
  //         total_video_watched: 108,
  //         device_type: "ios",
  //       });

  //       setUserInteractions([
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 10,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 10,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 10,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 10,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 10,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //         {
  //           Item_ID: "12fd-343hff-flksdj-sfsd43",
  //           Description: "Click to view",
  //           Genre: "Back Pain",
  //           Label: 1,
  //           Timestamp: "2023-01-22 23:02:12",
  //         },
  //       ]);

  //       setResults([
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.98,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.98,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.98,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.98,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.98,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //         {
  //           Item_ID: "a132-1jklf-8978-93j4-j3l43l",
  //           Description: "Click to view",
  //           Genre: "Comedy",
  //           Created_at: "2023-01-22 23:02:12",
  //           Score: 0.99,
  //         },
  //       ]);
  //     } catch (error) {
  //       console.log("Error occurred while fetching the models : ", error);
  //     }
  //   }
  //   getAttributesModels();
  // }, []);

  
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setUserAttributes({
      professionID: "Nurse",
      location: "USA",
      average_session: 24,
      total_video_watched: 108,
      device_type: "ios",
    });

    setUserInteractions([
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 10,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 10,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 10,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 10,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 10,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      {
        Item_ID: "12fd-343hff-flksdj-sfsd43",
        Description: "Click to view",
        Genre: "Back Pain",
        Label: 1,
        Timestamp: "2023-01-22 23:02:12",
      },
      // {
      //   Item_ID: "12fd-343hff-flksdj-sfsd43",
      //   Description: "Click to view",
      //   Genre: "Back Pain",
      //   Label: 1,
      //   Timestamp: "2023-01-22 23:02:12",
      // },
      // {
      //   Item_ID: "12fd-343hff-flksdj-sfsd43",
      //   Description: "Click to view",
      //   Genre: "Back Pain",
      //   Label: 1,
      //   Timestamp: "2023-01-22 23:02:12",
      // },
    ]);

    setResults([
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.98,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.98,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.98,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.98,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.98,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
      {
        Item_ID: "a132-1jklf-8978-93j4-j3l43l",
        Description: "Click to view",
        Genre: "Comedy",
        Created_at: "2023-01-22 23:02:12",
        Score: 0.99,
      },
    ]);

    console.log(userID);
  };

  const handleRandomUser = (e: any) => {
    setUserID('hello world')
  };

  return (
    <DashboardShell>
      <DashboardTableWrapper className="pb-16">
        <div className="px-12">
          <div className="flex justify-between">
            <TitleInfo className="py-12" title={"User"} />
            <div className="pt-8 pb-6 flex flex-row-reverse space-x-4 space-x-reverse">
              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-between space-x-4"
              > 
                <input
                  className="border border-slate-200 rounded-md p-2 h-10 w-96"
                  type="text"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  id="first"
                  placeholder="Search for id"
                  name="first"
                />
                <Button
                  
                  onClick={handleRandomUser}
                  
                  className="bg-black text-white rounded-2xl"
                >
                  Random
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white rounded-2xl"
                >
                  <div className="flex flex-row justify-between space-x-2">
                    <Image
                      src="/bulb.png"
                      width={20}
                      height={20}
                      alt="Picture of the author"
                    />
                    <span>Submit</span>
                  </div>
                </Button>
              </form>
            </div>
          </div>
          <UserAttrubuteTable userAttributes={userAttributes} />
          <UserInteractionsTable userInteractions={userInteractions} />
        </div>
      </DashboardTableWrapper>

      <DashboardTableWrapper className="pb-16">
        <div className="px-12">
          <TitleInfo className="py-12" title={"Results"} />
          <ResultsTable results={results}/>
        </div>
      </DashboardTableWrapper>
    </DashboardShell>
  );
}
