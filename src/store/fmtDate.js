export function fmtDate(arg) {
  const date = new Date(arg)
  const m = date.getMonth()+1
  const d = date.getDate()
  return m+ '月' + d + '日'
}