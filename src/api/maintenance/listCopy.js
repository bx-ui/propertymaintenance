import request from '@/router/axios'

export function chargePage(query) {
    return request({
      url: '/inspection/inspectionOrder/chargePage',
      method: 'get',
      params: query
    })
  }

  export function closeOrder(data) {
    return request({
      url: '/inspection/inspectionOrder/closeOrder',
      method: 'post',
      data: data
    })
  }

  export function getRole(obj) {
    return request({
      url: '/inspection/inspectionOrder/getRole',
      method: 'get',
      params: obj
    })
  }

  export function separateOrders(data) {
    return request({
      url: '/inspection/inspectionOrder/separateOrders',
      method: 'post',
      data: data
    })
  }