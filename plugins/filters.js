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

Vue.filter('dateTime', dateTime)
