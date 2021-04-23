import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/breed/list',
    method: 'get',
    params: params
  })
}

export function createBreed(data) {
  return request({
    url: '/breed/create',
    method: 'post',
    data: data
  })
}

export function updateBreed(data) {
  return request({
    url: '/breed/update',
    method: 'post',
    data: data
  })
}
export function updateSummary(id) {
  return request({
    url: '/breed/update-summary/' + id,
    method: 'post'
  })
}

export function getBreedInfo(id) {
  return request({
    url: '/breed/info/' + id,
    method: 'get'
  })
}

export function deleteBreed(id) {
  return request({
    url: '/breed/delete/' + id,
    method: 'post'
  })
}
export function getPatterList() {
  return request({
    url: '/breed-pattern/list',
    method: 'get',
  })
}
