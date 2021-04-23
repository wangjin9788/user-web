import request from '@/utils/request'

export function fetchList(id,params) {
  return request({
    url: '/breed-operation/list/' + id,
    method: 'get',
    params: params
  })
}

export function createBreedOperation(data) {
  return request({
    url: '/breed-operation/create',
    method: 'post',
    data: data
  })
}

export function updateBreedOperation(data) {
  return request({
    url: '/breed-operation/update',
    method: 'post',
    data: data
  })
}

export function getBreedOperationInfo(id) {
  return request({
    url: '/breed-operation/info/' + id,
    method: 'get'
  })
}

export function deleteBreedOperation(id) {
  return request({
    url: '/breed-operation/delete/' + id,
    method: 'post'
  })
}


