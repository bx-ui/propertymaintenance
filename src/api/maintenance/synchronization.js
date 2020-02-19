import request from '@/router/axios'

export function synchronizePage(query) {
    return request({
      url: '/maintenance/projectSupplier/synchronizePage',
      method: 'get',
      params: query
    })
  }

  export function addSynchronize(data) {
    return request({
      url: '/maintenance/projectSupplier/addSynchronize',
      method: 'post',
      data: data
    })
  }

  export function deleteSynchronize(data) {
    return request({
      url: '/maintenance/projectSupplier/deleteSynchronize',
      method: 'post',
      data: data
    })
  }