import request from '@/router/axios'

export function getData(query) {
  return request({
    url: '/maintenance/projectSupplier/page',
    method: 'get',
    params: query
  })
}
// 获得项目
export function getProject(query) {
    return request({
        url: '/maintenance/projectSupplier/getProject',
        method: 'get',
        params: query
    })
}

// 获得供应商
export function getSupplier(query) {
    return request({
        url: '/maintenance/projectSupplier/getSupplier',
        method: 'get',
        params: query
    })
}

// 获得合同
export function getContract(query) {
    return request({
        url: '/maintenance/projectSupplier/getContract',
        method: 'get',
        params: query
    })
}

// 添加
export function addContract(data) {
    return request({
        url: '/maintenance/projectSupplier/addContract',
        method: 'post',
        data: data
    })
}

// 添加
export function deletes(data) {
    return request({
        url: '/maintenance/projectSupplier/deletes',
        method: 'post',
        data: data
    })
}