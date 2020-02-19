import request from '@/router/axios'

export function getParentCodeList(query) {
  return request({
    url: '/personnel/hzPersonnelRole/getParentCodeList',
    method: 'get',
    params: query
  })
}

export function getCodeList(query) {
  return request({
    url: '/personnel/hzPersonnelRole/getCodeList',
    method: 'get',
    params: query
  })
}

export function getpage(query) {
  return request({
    url: '/personnel/personnelUser/page',
    method: 'get',
    params: query
  })
}

export function getProject(query) {
  return request({
    url: '/personnel/hzBasis/getProject',
    method: 'get',
    params: query
  })
}

export function getSupplier(query) {
  return request({
    url: '/personnel/hzBasis/getSupplier',
    method: 'get',
    params: query
  })
}

export function getContract(query) {
  return request({
    url: '/personnel/hzBasis/getContract',
    method: 'get',
    params: query
  })
}

export function lzSubmit(data) {
  return request({
    url: '/personnel/personnelUser/lzSubmit',
    method: 'post',
    data: data
  })
}

export function confirm(data) {
  return request({
    url: '/personnel/personnelUser/confirm',
    method: 'post',
    data: data
  })
}