import request from '@/utils/request'

export function getBreedSummaryInfo(id) {
  return request({
    url: '/breed-summary/info/' + id,
    method: 'get'
  })
}
export function getBreedGrowthAnalysis(id) {
  return request({
    url: '/breed-measure/growth-analysis/' + id,
    method: 'get'
  })
}
