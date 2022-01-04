import request from '@/utils/request'

export function fetchList(id,params) {
  return request({
    url: '/fermentation-detail/list/' + id,
    method: 'get',
    params: params
  })
}

export function createFermentationDetail(data) {
  return request({
    url: '/fermentation-detail/create',
    method: 'post',
    data: data
  })
}

export function updateFermentationDetail(data) {
  return request({
    url: '/fermentation-detail/update',
    method: 'post',
    data: data
  })
}

export function getFermentationDetailInfo(id) {
  return request({
    url: '/fermentation-detail/info/' + id,
    method: 'get'
  })
}

export function deleteFermentationDetail(id) {
  return request({
    url: '/fermentation-detail/delete/' + id,
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
export function batchFerDetail(data) {
  return request({
    url: '/fermentation-detail/batch/detail',
    method: 'post',
    data: data
  })
}

