import request from '@/router/axios'

export function getData(query) {
  return request({
    url: '/maintenance/projectSupplier/handoverPage',
    method: 'get',
    params: query
  })
}

export function getHandover(query) {
  return request({
    url: '/maintenance/projectSupplier/getHandover',
    method: 'get',
    params: query
  })
}

export function addHandover(data) {
  return request({
    url: '/maintenance/projectSupplier/addHandover',
    method: 'post',
    data: data
  })
}
