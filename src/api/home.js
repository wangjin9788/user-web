import request from '@/utils/request'
export function getPayAndRevenue() {
  return request({
    url: '/pay-analysis/pay_revenue_analysis',
    method: 'get',
  })
}
