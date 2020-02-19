import request from '@/router/axios'

export function getData(query) {
  return request({
    url: '/maintenance/hzPropertyRepair/page',
    method: 'get',
    params: query
  })
}

// 获取业主信息
export function getPeopleData(obj) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisOwnerList',
    method: 'post',
    data: obj
  })
}

// 获取项目
export function getProjects(query) {
  return request({
    url: '/admin/outInterface/getMdmProject',
    method: 'get',
    params: query
  })
}

// 获取分期
export function getUnit(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisProjectStageList',
    method: 'get',
    params: query
  })
}

// 获取楼栋
export function getStore(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisBuildList',
    method: 'get',
    params: query
  })
}

// 获取单元
export function getDans(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisUnitList',
    method: 'get',
    params: query
  })
}

// 获得房号
export function getHaos(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisRoomList',
    method: 'get',
    params: query
  })
}

// 用于导出的获取列表页所有数据
export function getAllData(query) {
  return request({
    url: '/maintenance/hzPropertyRepair/list',
    method: 'get',
    params: query
  })
}

// 报修模块明细三级联动
export function getModelData(query) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisProblemList',
    method: 'get',
    params: query
  })
}

// 带出供应商信息
export function getSupperData(obj){
  return request({
    url: '/maintenance/hzBasis/getHzBasisProblemSupplierList',
    method: 'post',
    data: obj
  })
}

// 提交表单
export function saveSubmit(obj){
  return request({
    url: '/maintenance/hzPropertyRepair/save',
    method: 'post',
    data: obj
  })
}

// 作废
export function dels(obj){
  return request({
    url: '/maintenance/hzPropertyRepair/invalid',
    method: 'post',
    data: obj
  })
}

// 详情
export function details(query){
  return request({
    url: '/maintenance/hzPropertyRepair/details',
    method: 'get',
    params: query
  })
}

// 保存
export function submit(data){
  return request({
    url: '/maintenance/hzPropertyRepair/submit',
    method: 'post',
    data: data
  })
}

export function getPage(data) {
  return request({
    url: '/maintenance/hzPropertyRepair/transferOrder',
    method: 'post',
    data: data
  })
}

export function skipOrder(data) {
  return request({
    url: '/maintenance/hzPropertyRepair/skipOrder',
    method: 'post',
    data: data
  })
}

export function asdf(data) {
  return request({
      url: '/portaltest/visit/getPipList',
      method:'post',
      params: data
  })
}