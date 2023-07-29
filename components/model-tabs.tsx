import {
  CustomTabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { Outline } from "./outline"
import TitleInfo from "./title-info"
import { Selector } from "./selector"
import { MetricsTabEnum } from "@/types/enums"

interface ModelTabsProps {
  currentTab: MetricsTabEnum
  onTabClick: (tab: MetricsTabEnum) => void
}

export function ModelTabs({ currentTab, onTabClick }: ModelTabsProps) {
  const [graphType, setGraphType] = useState<string>("Chart")
  const [duration, setDuration] = useState<string>("24 HR")

  console.log(graphType)

  return (
    <Outline className="flex flex-row items-center justify-between">
      <TitleInfo title="Performance" />
      <Tabs
        defaultValue={MetricsTabEnum.Business}
        orientation="vertical"
        onValueChange={(e) => onTabClick(e)}
      >
        <TabsList aria-label="tabs example" className="bg-white">
          <CustomTabsTrigger
            value={MetricsTabEnum.Business}
            activeValue={currentTab}
          >
            Business
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value={MetricsTabEnum.Online}
            activeValue={currentTab}
          >
            Online
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value={MetricsTabEnum.Training}
            activeValue={currentTab}
          >
            Training
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value={MetricsTabEnum.System}
            activeValue={currentTab}
          >
            System
          </CustomTabsTrigger>
        </TabsList>

        {/* <TabsContent value={TabEnum.Business}>Tab Business content</TabsContent>
      <TabsContent value={TabEnum.Online}>Tab Online content</TabsContent>
      <TabsContent value={TabEnum.Training}>Tab Training content</TabsContent>
      <TabsContent value={TabEnum.System}>Tab System content</TabsContent> */}
      </Tabs>
      <div className="flex flex-row items-center space-x-2">
        <p>View:</p>

        <Selector
          onValueChange={(value) => setGraphType(value)}
          items={["Chart", "Numbers"]}
          placeholder={graphType}
          className="min-w-[80px]"
        />

        <Selector
          onValueChange={(value) => setDuration(value)}
          items={["24 HR", "12 HR"]}
          placeholder={duration}
          className="min-w-[60px]"
        />
      </div>
    </Outline>
  )
}
