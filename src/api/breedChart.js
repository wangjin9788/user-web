import request from '@/utils/request'

export function getBreedChartTemperatureList(id) {
  return request({
    url: '/breed-detail/temperature/' + id,
    method: 'get'
  })
}
