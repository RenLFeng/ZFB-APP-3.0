import dayjs from 'dayjs'

export const formatDate = number => dayjs(Number(number)).format('YYYY-MM-DD HH:mm:ss')
export const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)))
export const objectFromPairs = arr =>
  arr.reduce(
    (init, v) => ({
      ...init,
      [v[0]]: v[1]
    }),
    {}
  )

export const accessHalfYearMonthList = () => {
  let monthArray = []
  const now = dayjs()
  for (let index = 0; index <= 5; index++) {
    monthArray.push(now.subtract(index, 'month').format('YYYY-MM'))
  }
  return monthArray.map((v, i) => ({
    month: v,
    time: v.replace(/-/, '年') + '月',
    key: i
  }))
}

export const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()


export const  filter = num => {
  if(num)
  {
    
      num = num.toString().replace(/\$|\,/g,'');
    
      if(''==num || isNaN(num)){return 'Not a Number ! ';}
    
      var sign = num.indexOf("-")> 0 ? '-' : '';
    
      var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
      cents = cents.length>1 ? cents : '' ;

      num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
    
      if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
     
      else{if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}

      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      {
          num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
      }

      return (sign + num + cents);    
  }
}
export const  numFilter = value => {
  let tempVal = parseFloat(value).toFixed(3)
  let realVal = tempVal.substring(0, tempVal.length - 1)
  return realVal
}