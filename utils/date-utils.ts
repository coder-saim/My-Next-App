import moment from "moment"

export const getTimeDiffFromDateString = (dateTime: string) => {
  const createdDate = moment.utc(dateTime.split(" ")[0])
  const currentDate = moment.utc()
  const seconds = currentDate.diff(createdDate) / 1000
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days < 1) {
    if (hours) return `${hours} ${hours == 1 ? "hour" : "hours"} ago`
    else return `${minutes} ${minutes <= 1 ? "minute" : "minutes"} ago`
  } else if (days == 1) return "1 day ago"
  else if (days < 10) return `${days} days ago`
  else return createdDate.format("MM/DD/yyyy")
}
