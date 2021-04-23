import request from '@/utils/request'

export function fetchList(id,params) {
  return request({
    url: '/breed-treatment/list/' + id,
    method: 'get',
    params: params
  })
}

export function createBreedTreatment(data) {
  return request({
    url: '/breed-treatment/create',
    method: 'post',
    data: data
  })
}

export function updateBreedTreatment(data) {
  return request({
    url: '/breed-treatment/update',
    method: 'post',
    data: data
  })
}

export function getBreedTreatmentInfo(id) {
  return request({
    url: '/breed-treatment/info/' + id,
    method: 'get'
  })
}

export function deleteBreedTreatment(id) {
  return request({
    url: '/breed-treatment/delete/' + id,
    method: 'post'
  })
}


