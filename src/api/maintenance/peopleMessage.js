import request from '@/router/axios'

  export function getProjectTree(query) {
    return request({
      url: '/maintenance/projectSupplier/getProjectTree',
      method: 'get',
      params: query
    })
  }

  export function getRoleMessage(query) {
    return request({
      url: '/maintenance/hzBasis/getRoleMessage',
      method: 'get',
      params: query
    })
  }

  export function getPage(query) {
    return request({
      url: '/maintenance/hzBasisUser/page',
      method: 'get',
      params: query
    })
  }

  export function save(obj) {
    return request({
      url: '/personnel/personnelUser/save',
      method: 'post',
      data: obj
    })
  }

  export function detail(query) {
    return request({
      url: '/personnel/personnelUser/details',
      method: 'get',
      params: query
    })
  }

  export function submit(obj) {
    return request({
      url: '/personnel/personnelUser/submit',
      method: 'post',
      data: obj
    })
  }

  export function approval(query) {
    return request({
      url: '/personnel/personnelUser/approval',
      method: 'get',
      params: query
    })
  }

  export function getCode(query) {
    return request({
      url: '/personnel/personnelUser/getCode',
      method: 'get',
      params: query
    })
  }