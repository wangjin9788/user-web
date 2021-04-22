import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/fermentation/list',
    method: 'get',
    params: params
  })
}

export function createFermentation(data) {
  return request({
    url: '/fermentation/create',
    method: 'post',
    data: data
  })
}

export function updateFermentation(data) {
  return request({
    url: '/fermentation/update',
    method: 'post',
    data: data
  })
}
export function updateSummary(id) {
  return request({
    url: '/fermentation/update-summary/' + id,
    method: 'post'
  })
}

export function getFermentationInfo(id) {
  return request({
    url: '/fermentation/info/' + id,
    method: 'get'
  })
}

export function deleteFermentation(id) {
  return request({
    url: '/fermentation/delete/' + id,
    method: 'post'
  })
}

export function getPattern(id) {
  return request({
    url: '/fer-pattern/info/' + id,
    method: 'get'
  })
}

export function getPatternList() {
  return request({
    url: '/fer-pattern/list',
    method: 'get',
  })
}

export function getEvaluateList() {
  return request({
    url: '/evaluate/list',
    method: 'get',
  })
}
