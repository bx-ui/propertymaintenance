import request from '@/router/axios'

// 报修模块明细三级联动
export function getModelData(query) {
    return request({
      url: '/maintenance/hzBasis/getHzBasisProblemList',
      method: 'get',
      params: query
    })
  }

  export function getProjectTree(query) {
    return request({
      url: '/maintenance/projectSupplier/getProjectTree',
      method: 'get',
      params: query
    })
  }

  export function problemSupplierPage(query) {
    return request({
      url: '/maintenance/projectSupplier/problemSupplierPage',
      method: 'get',
      params: query
    })
  }

  export function getSupplierByStage(query) {
    return request({
      url: '/maintenance/projectSupplier/getSupplierByStage',
      method: 'get',
      params: query
    })
  }

  export function getBuild(query) {
    return request({
      url: '/maintenance/projectSupplier/getBuild',
      method: 'get',
      params: query
    })
  }

  export function addProblemSupplier(data) {
    return request({
      url: '/maintenance/projectSupplier/addProblemSupplier',
      method: 'post',
      data: data
    })
  }

  export function deleteProblemSupplier(data) {
    return request({
      url: '/maintenance/projectSupplier/deleteProblemSupplier',
      method: 'post',
      data: data
    })
  }

  export function getModule(query) {
    return request({
      url: '/maintenance/projectSupplier/getModule',
      method: 'get',
      params: query
    })
}

  export function getBigClass(query) {
      return request({
        url: '/maintenance/projectSupplier/getBigClass',
        method: 'get',
        params: query
      })
  }

  export function getContractByStage(query) {
    return request({
      url: '/maintenance/projectSupplier/getContractByStage',
      method: 'get',
      params: query
    })
  }