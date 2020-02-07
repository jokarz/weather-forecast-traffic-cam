export const getDateString = date => {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

export const getTimeString = date => {
  return date.toTimeString().substring(0, 8)
}