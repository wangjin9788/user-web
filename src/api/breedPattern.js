import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/breed-pattern/list',
    method: 'get',
  })
}

export function createPattern(data) {
  return request({
    url: '/breed-pattern/create',
    method: 'post',
    data: data
  })
}

export function updatePattern(data) {
  return request({
    url: '/breed-pattern/update',
    method: 'post',
    data: data
  })
}

export function getPattern(id) {
  return request({
    url: '/breed-pattern/info/' + id,
    method: 'get'
  })
}

export function deletePattern(id) {
  return request({
    url: '/breed-pattern/delete/' + id,
    method: 'post'
  })
}
