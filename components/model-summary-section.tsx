"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { StatusChip } from "./status-chip"
import { ModelDetails, Organization } from "@/types"
import { IconTitle } from "./ui/icon-title"
import { getTimeDiffFromDateString } from "@/utils/date-utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Outline } from "./outline"
import { Icons } from "./icons"
import { SecureTextComponent } from "./secure-text"
import {
  Select,
  SelectIcon,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"
import { SelectContent, SelectItem } from "./ui/select"
import { useEffect, useState } from "react"
import { getOrganizationInfo } from "@/utils/organization-info"

import MarkDown from "./markdown"
import { Selector } from "./selector"

interface ModelSummarySectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  modelDetails: ModelDetails
}

const terminalScript = (modelName: string): string => {
  const cliCommand = `
  shaped view-model --model-name ${modelName}`
  return cliCommand
}

const terminalScriptMarkdown = (modelName: string): string => {
  const cliCommand = `
  ~~~bash
  shaped view-model --model-name ${modelName}`
  return cliCommand
}

const curlScript = (apiKey: string, modelUri: string): string => {
  const curlCommand = `
  curl ${modelUri} \\
      -H "x-api-key: ${apiKey}" \\
      -H "Content-Type: application/json"`
  return curlCommand
}

const curlScriptMarkdown = (apiKey: string, modelUri: string): string => {
  const curlCommand = `
  ~~~bash
  curl ${modelUri} \\
        -H "x-api-key: ${apiKey}" \\
        -H "Content-Type: application/json"`
  return curlCommand
}

export function ModelSummarySection({
  modelDetails,
  className,
  children,
  ...props
}: ModelSummarySectionProps) {
  const [organization, setOrganization] = useState<Organization>(
    {} as Organization
  )
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const LockIcon = Icons["lock"]
  const TerminalIcon = Icons["terminal"]
  const ChevronDownIcon = Icons["chevronDown"]

  const [requestType, setRequestType] = useState("cURL")

  const getMarkdown = (requestType: string) => {
    const markdown =
      requestType == "cURL"
        ? curlScriptMarkdown(organization.apiKey, modelDetails.model_uri)
        : terminalScriptMarkdown(modelDetails.model_name)
    return markdown
  }

  const getMarkdownCopyContent = (requestType: string) => {
    const markdown =
      requestType == "cURL"
        ? curlScript(organization.apiKey, modelDetails.model_uri)
        : terminalScript(modelDetails.model_name)
    return markdown
  }

  useEffect(() => {
    async function getOrganization() {
      try {
        const organization = await getOrganizationInfo()
        if (!organization) {
          setError(true)
          return
        }
        setOrganization(organization)
      } catch (error) {
        setError(true)
        console.log("Error occurred while fetching the API key : ", error)
      }
    }
    getOrganization()
  }, [])

  return (
    <Dialog.Root>
      <div
        className={cn(
          "flex flex-col items-start justify-start rounded-md border border-solid p-8 text-center animate-in fade-in-50",
          className
        )}
      >
        <div className="flex w-[100%] justify-between">
          <h2 className={cn("text-xl font-semibold")}>
            {modelDetails.model_name}
          </h2>
          <Dialog.Trigger asChild>
            <button
              className={cn(buttonVariants(), "h-8 rounded-full font-normal")}
            >
              <span className="font-semibold">Request details</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-700/70 data-[state=open]:animate-overlay-show" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[95vh] w-[60%]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none data-[state=open]:animate-content-show">
              <div className="flex flex-col space-y-8">
                <div>
                  <Dialog.Title className="text-base-black m-0 text-[17px] font-bold">
                    Request details
                  </Dialog.Title>
                  <div>See request details for this model.</div>
                </div>

                <Outline className="p-2">
                  <div className="w-full border-b-2">
                    <div className="flex p-2">
                      <div className="flex w-[10rem]  space-x-2 font-medium ">
                        <div className="text-gray-900 underline ">API Key</div>
                        <LockIcon className="h-5 w-5 rounded-sm" />
                      </div>
                      <SecureTextComponent secureText={organization?.apiKey} />
                    </div>
                  </div>

                  <div className="flex p-2">
                    <div className="flex w-[10rem] space-x-2 font-medium">
                      <div className="text-gray-900 underline">Model URI</div>
                    </div>
                    <a
                      href={modelDetails.model_uri}
                      className="text-gray-500 underline"
                    >
                      {modelDetails.model_uri}
                    </a>
                  </div>
                </Outline>

                <div className="flex space-x-6">
                  <div className="font-bold">Request</div>
                  <Selector
                    onValueChange={(value) => setRequestType(value)}
                    items={["cURL", "CLI"]}
                    placeholder="cURL"
                  />
                </div>

                <MarkDown
                  markDownContent={getMarkdown(requestType)}
                  copyContent={getMarkdownCopyContent(requestType)}
                />

                <div className="flex items-center space-x-2">
                  <TerminalIcon className="h-5 w-5 rounded-sm" />
                  <div>
                    Learn more about the{" "}
                    <a
                      href="https://docs.shaped.ai/docs/overview/welcome/"
                      className="underline"
                    >
                      Shaped API
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-1"></div>

              <div className="mt-[25px] flex justify-start gap-4">
                <Dialog.Close asChild>
                  <button
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <span className="font-semibold">Cancel</span>
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </div>

        <div className="mt-3 flex w-[40%] justify-between">
          <div className="flex-col space-y-1">
            <IconTitle title="Status" iconName="status" />
            <StatusChip status={modelDetails.status} />
          </div>

          <div className="flex-col space-y-1">
            <IconTitle title="Created" iconName="terminal" />

            <div className="text-grey-900">
              {getTimeDiffFromDateString(modelDetails?.created_at)}
            </div>
          </div>
        </div>

        {children}
      </div>
    </Dialog.Root>
  )
}
