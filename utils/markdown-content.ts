export const terminalScript = (modelName: string): string => {
  const cliCommand = `
    shaped view-model --model-name ${modelName}
    `
  return cliCommand
}

export const terminalScriptMarkdown = (modelName: string): string => {
  const cliCommand = `
      ~~~bash
      shaped view-model --model-name ${modelName}
      `
  return cliCommand
}

export const curlScript = (apiKey: string, modelUri: string): string => {
  const curlCommand = `
  curl ${modelUri} \\
      -H "x-api-key: ${apiKey}" \\
      -H "Content-Type: application/json"`
  return curlCommand
}

export const curlScriptMarkdown = (
  apiKey: string,
  modelUri: string
): string => {
  const curlCommand = `
  ~~~bash
  curl ${modelUri} \\
        -H "x-api-key: ${apiKey}" \\
        -H "Content-Type: application/json"`
  return curlCommand
}
