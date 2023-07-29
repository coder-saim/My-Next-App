interface ChipColors {
  textColor: string
  backgroundColor: string
}

const getStatusColor = (status: string): ChipColors => {
  switch (status.trim().toUpperCase()) {
    case "ACTIVE":
      return { textColor: "text-green-800", backgroundColor: "bg-green-100" }
    case "SCHEDULING":
      return { textColor: "text-yellow-800", backgroundColor: "bg-yellow-100" }
    case "FETCHING":
      return { textColor: "text-violet-800", backgroundColor: "bg-violet-100" }
    case "TRAINING":
      return { textColor: "text-blue-800", backgroundColor: "bg-blue-100" }
    case "DEPLOYING":
      return { textColor: "text-orange-800", backgroundColor: "bg-orange-100" }
    case "ERROR":
      return { textColor: "text-red-800", backgroundColor: "bg-red-100" }
    case "INACTIVE":
      return { textColor: "text-slate-800", backgroundColor: "bg-gray-100" }
    default:
      return { textColor: "text-slate-800", backgroundColor: "bg-gray-100" }
  }
}

export default getStatusColor
