import request from '@/utils/request'

export function weatherList(params) {
  return request({
    url: '/weather/list',
    method: 'get'
  })
}

export function createWeather(data) {
  return request({
    url: '/weather/create',
    method: 'post',
    data: data
  })
}

export function updateWeather(data) {
  return request({
    url: '/weather/update',
    method: 'post',
    data: data
  })
}

export function getWeather(params) {
  return request({
    url: '/weather/query',
    method: 'get',
    params: params
  })
}
export function deleteWeather(id) {
  return request({
    url: '/weather/delete/' + id,
    method:'post'
  })
}
export function getWeatherInfo(id) {
  return request({
    url: '/weather/info/' + id,
    method: 'get'
  })
}
