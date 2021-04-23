import request from '@/utils/request'

export function fetchList(id,params) {
  return request({
    url: '/breed-evaluate/list/' + id,
    method: 'get',
    params: params
  })
}

export function createBreedEvaluate(data) {
  return request({
    url: '/breed-evaluate/create',
    method: 'post',
    data: data
  })
}

export function updateBreedEvaluate(data) {
  return request({
    url: '/breed-evaluate/update',
    method: 'post',
    data: data
  })
}

export function getBreedEvaluateInfo(id) {
  return request({
    url: '/breed-evaluate/info/' + id,
    method: 'get'
  })
}

export function deleteBreedEvaluate(id) {
  return request({
    url: '/breed-evaluate/delete/' + id,
    method: 'post'
  })
}


