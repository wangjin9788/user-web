import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/breed-pathology/list',
    method: 'get',
    params: params
  })
}

export function createBreedPathology(data) {
  return request({
    url: '/breed-pathology/create',
    method: 'post',
    data: data
  })
}

export function updateBreedPathology(data) {
  return request({
    url: '/breed-pathology/update',
    method: 'post',
    data: data
  })
}

export function getBreedPathologyInfo(id) {
  return request({
    url: '/breed-pathology/info/' + id,
    method: 'get'
  })
}

export function deleteBreedPathology(id) {
  return request({
    url: '/breed-pathology/delete/' + id,
    method: 'post'
  })
}


