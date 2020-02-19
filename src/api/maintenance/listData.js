import request from '@/router/axios'

export function getPage(query) {
    return request({
      url: '/inspection/inspectionOrder/page',
      method: 'get',
      params: query
    })
  }

  export function add(data) {
    return request({
      url: '/inspection/inspectionOrder/add',
      method: 'post',
      data: data
    })
  }

  export function deletes(data) {
    return request({
      url: '/inspection/inspectionOrder/deletes',
      method: 'post',
      data: data
    })
  }

  export function skipOrder(data) {
    return request({
      url: '/inspection/inspectionOrder/skipOrder',
      method: 'post',
      data: data
    })
  }

  export function details(obj) {
    return request({
      url: '/inspection/inspectionOrder/details',
      method: 'get',
      params: obj
    })
  }