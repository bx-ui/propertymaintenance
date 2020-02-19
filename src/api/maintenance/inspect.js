import request from '@/router/axios'

export function getTree(query) {
  return request({
    url: '/inspection/inspectionItems/tree',
    method: 'get',
    params: query
  })
}

export function getItemsByParentId(query) {
    return request({
      url: '/inspection/inspectionItems/getItemsByParentId',
      method: 'get',
      params: query
    })
  }

  export function add(data) {
    return request({
      url: '/inspection/inspectionItems/add',
      method: 'post',
      data: data
    })
  }

  export function update(data) {
    return request({
      url: '/inspection/inspectionItems/update',
      method: 'post',
      data: data
    })
  }