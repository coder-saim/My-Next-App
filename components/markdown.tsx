import React from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import light from "react-syntax-highlighter/dist/esm/styles/prism/duotone-light"

import { Outline } from "./outline"
import CopyTextIcon from "./copy-text-icon"

interface MarkDownProps {
  markDownContent: string
  copyContent: string
}

export default function MarkDown({
  markDownContent,
  copyContent,
}: MarkDownProps) {
  return (
    <Outline className="p-2">
      <div className="flex w-full items-start justify-between">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              console.log(match, className)
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  language={match[1]}
                  style={light}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markDownContent}
        </ReactMarkdown>
        <CopyTextIcon text={copyContent} />
      </div>
    </Outline>
  )
}
