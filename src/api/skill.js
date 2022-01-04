import request from '@/utils/request'

export function fetchContent(type) {
  return request({
    url: '/skill/info/' + type,
    method: 'get'
  })
}
