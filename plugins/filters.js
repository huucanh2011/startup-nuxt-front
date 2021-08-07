import Vue from 'vue'

const dateTime = (val) => {
  const date = new Date(val)
  return date.toLocaleString(['vi-VI'], {
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

const displayDataNull = (val) => {
  if (val === undefined || val === null || val === '') {
    return '-'
  }
  return val
}

const currencyVNFormat = (val) => {
  return `${val.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')} đ`
}

Vue.filter('dateTime', dateTime)
Vue.filter('displayDataNull', displayDataNull)
Vue.filter('currencyVN', currencyVNFormat)
