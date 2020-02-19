import request from '@/router/axios'

export function getData(query) {
    return request({
      url: '/maintenance/hzpropertymaintenance/getProcessDBUrlList',
      method: 'get',
      params: query
    })
  }