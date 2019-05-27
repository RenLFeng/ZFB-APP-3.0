// 金额过滤
export function cutAmount(number) {
  if (number === 0) return '0.00'
  var intPart = number + ''
  var intPartFormat = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  var floatPart = '.00'
  var value2Array = intPart.split('.')
  // return intPartFormat+floatPart;
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    var numPart = value2Array[0].toString()
    numPart = numPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    if (floatPart.length === 1) {
      return numPart + '.' + floatPart + '0'
    } else {
      return numPart + '.' + floatPart
    }
  }else if (floatPart.length > 3) {
    
    return intPartFormat + floatPart.slice(1 , 3)
  }else {
    return intPartFormat + floatPart
  }
}

// 时间戳转换
export function cutTime(dataTime) {
  if (!dataTime) return ''
  let date = new Date(dataTime)
  let y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m
}