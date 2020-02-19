import request from '@/router/axios'

export function getData(query) {
    return request({
      url: '/maintenance/hzPropertyAcceptance/getPage',
      method: 'get',
      params: query
    })
  }

  export function getDetail(query) {
    return request({
      url: '/maintenance/hzPropertyAcceptance/getAcceptanceExamineDetail',
      method: 'get',
      params: query
    })
  }
  
  export function getHistory(obj) {
    return request({
      url: '/maintenance/hzpropertymaintenance/getProcessFlowHistoryList',
      method: 'get',
      params: obj
    })
  }

  export function getApproval(query) {
    return request({
      url: '/maintenance/hzPropertyAcceptance/agreeHzAcceptance',
      method: 'get',
      params: query
    })
  }

  export function getAllData(query) {
    return request({
      url: '/maintenance/hzPropertyAcceptance/searchAcceptanceForExport',
      method: 'get',
      params: query
    })
  }