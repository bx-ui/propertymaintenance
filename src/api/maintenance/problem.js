import request from '@/router/axios'

export function problemPage(query) {
    return request({
      url: '/maintenance/projectSupplier/problemPage',
      method: 'get',
      params: query
    })
}

export function addProblem(obj) {
    return request({
      url: '/maintenance/projectSupplier/addProblem',
      method: 'post',
      data: obj
    })
}

export function updateProblem(obj) {
    return request({
      url: '/maintenance/projectSupplier/updateProblem',
      method: 'post',
      data: obj
    })
}

export function getModule(query) {
    return request({
      url: '/maintenance/projectSupplier/getModule',
      method: 'get',
      params: query
    })
}
export function deleteProblem(obj) {
    return request({
      url: '/maintenance/projectSupplier/deleteProblem',
      method: 'post',
      data: obj
    })
}

