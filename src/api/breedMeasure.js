import request from '@/utils/request'

export function fetchList(id,params) {
  return request({
    url: '/breed-measure/list/' + id,
    method: 'get',
    params: params
  })
}

export function createBreedMeasure(data) {
  return request({
    url: '/breed-measure/create',
    method: 'post',
    data: data
  })
}

export function updateBreedMeasure(data) {
  return request({
    url: '/breed-measure/update',
    method: 'post',
    data: data
  })
}

export function getBreedMeasureInfo(id) {
  return request({
    url: '/breed-measure/info/' + id,
    method: 'get'
  })
}

export function deleteBreedMeasure(id) {
  return request({
    url: '/breed-measure/delete/' + id,
    method: 'post'
  })
}


