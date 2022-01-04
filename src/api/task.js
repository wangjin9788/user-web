import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/task/list',
    method: 'get',
    params: params
  })
}

export function createTask(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data: data
  })
}
export function updateTaskStatus(id) {
  return request({
    url: '/task/updateStatus/' + id,
    method: 'post'
  })
}

export function getTask(id) {
  return request({
    url: '/task/info/' + id,
    method: 'get'
  })
}
export function deleteTask(id) {
  return request({
    url: '/task/delete/' + id,
    method:'post'
  })
}
export function getTaskRelationList(type) {
  return request({
    url: '/task/relation/' + type,
    method: 'get'
  })
}
