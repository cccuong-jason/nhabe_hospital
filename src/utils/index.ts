import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: Date, format: string = 'hh:mm') => {
  return dayjs(date).format(format)
}

export const checkIsMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const addNewLine = (text: string) => {
  return text.replace(/\n/g, '<br>')
}

export const indexMethod = (index: number) => {
  return index + 1
}

export const transformList = (originalList: any[], key: string): any[] => {
  const uniqueValues = new Set(originalList.map((item) => item[key]))

  return Array.from(uniqueValues).map((value) => ({
    text: value,
    value: value,
  }))
}

export const convertToUTC = (value: any) => {
  // Convert the selected date to the local time zone
  return dayjs.utc(value).local()
}
