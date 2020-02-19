import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/maintenance/hzpropertyrepair/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/maintenance/hzpropertyrepair/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/maintenance/hzpropertyrepair/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/maintenance/hzpropertyrepair/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/maintenance/hzpropertyrepair/',
    method: 'put',
    data: obj
  })
}

export function delObjs(params) {
    return request({
        url: '/maintenance/hzpropertyrepair/delObjs',
        method:'get',
        params: params
    })
}


