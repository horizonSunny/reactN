export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function diffTime(diff) {
  diff = Math.floor(diff / 1000);
  const hour = diff >= 3600 ? Math.floor(diff / 3600) : 0
  const min = diff >= 60 ? Math.floor((diff - hour * 3600) / 60) : 0
  const sec = diff >= 0 ?  Math.floor((diff - min * 60 - hour * 3600) % 60) : 0
  return add0(hour) + ':' + add0(min) + ':' + add0(sec)
}

function add0(num) {
  return num < 10 ? '0' + num : num
}