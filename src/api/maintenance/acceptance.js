import request from '@/router/axios'

export function getProjects(query) {
  return request({
    url: '/admin/outInterface/getMdmProject',
    method: 'get',
    params: query
  })
}

export function getUnit(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisProjectStageList',
    method: 'get',
    params: query
  })
}

export function getStore(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisBuildList',
    method: 'get',
    params: query
  })
}

export function getDans(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisUnitList',
    method: 'get',
    params: query
  })
}

export function getHaos(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisRoomList',
    method: 'get',
    params: query
  })
}

export function getData(query) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/getAcceptance',
    method: 'get',
    params: query
  })
}

export function getDetail(query) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/acceptanceDetail',  
    method: 'get',
    params: query
  })
}

export function getTemporary(obj) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/temporary',
    method: 'post',
    data: obj
  })
}

export function getAllData(query) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/export',
    method: 'get',
    params: query
  })
}

export function getSubmit(obj) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/submit',
    method: 'post',
    data: obj
  })
}

export function getPage(obj) {
  return request({
    url: '/maintenance/hzPropertyRepair/transferOrder',
    method: 'post',
    data: obj
  })
}

export function doFinish(obj) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/confirmAcceptance',
    method: 'post',
    data: obj
  })
}

export function doBack(obj) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/reject',  
    method: 'post',
    data: obj
  })
}

export function doClose(obj) {
  return request({
    url: '/maintenance/hzPropertyAcceptance/forceCloseBill',
    method: 'post',
    data: obj
  })
}

// hzPropertyAcceptance/page