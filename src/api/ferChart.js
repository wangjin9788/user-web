import request from '@/utils/request'

export function getFerChartTemperatureList(id) {
  return request({
    url: '/fer_chart/temperature/' + id,
    method: 'get'
  })
}

export function getFerChartHumidityList(id) {
  return request({
    url: '/fer_chart/humidity/' + id,
    method: 'get'
  })
}
