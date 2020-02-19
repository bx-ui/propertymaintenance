import request from '@/router/axios'

export function getTableList(obj) { //岗位管理列表
  return request({
    url: '/personnel/hzPersonnelRole/getHzBasisRole',
    method: 'get',
    params: obj
  })
}

export function getDetail(obj) { //点击详情按钮,获取详情
  return request({
    url: '/personnel/hzPersonnelRole/getHzBasisRole', 
    method: 'get',
    params: obj
  })
}

export function getWeaveTableList(obj) { //岗位管理列表
  return request({
    url: '/personnel/hzPersonnelRolePlan/getPage',
    method: 'get',
    params: obj
  })
}

export function addNewJob(obj) { //新增职能信息
  return request({
    url: '/personnel/hzPersonnelRole/saveHzAcceptance',
    method: 'post',
    data: obj
  })
}

export function deleteListItem(obj) { //修改岗位详情
  return request({
    url: '/personnel/hzPersonnelRole/deleteRole',
    method: 'get',
    params: obj
  })
}

export function getJobList() { //职能信息下拉框
  return request({
    url: '/personnel/hzPersonnelRole/getParentCodeList',
    method: 'get',
  })
}

export function getJobDetails(obj) { //获取岗位详情
  return request({
    url: '/personnel/hzPersonnelRole/getHzBasisRoleDetail',
    method: 'get',
    params: obj
  })
}

export function editJob(obj) { //修改岗位详情
  return request({
    url: '/personnel/hzPersonnelRole/updateHzBasisRole',
    method: 'post',
    data: obj
  })
}

export function getStationOptions() { //获取岗位下拉列表
  return request({
    url: '/personnel/hzPersonnelRolePlan/getHzRole',
    method: 'get',
  })
}

export function addWeaveInfo(obj) { //添加岗位编制信息
  return request({
    url: '/personnel/hzPersonnelRolePlan/saveRolePlan',
    method: 'post',
    data: obj
  })
}

export function getWeaveInfo(obj) { //获取岗位编制信息
  return request({
    url: '/personnel/hzPersonnelRolePlan/getPageDetail',
    method: 'get',
    params: obj
  })
}

export function editWeaveInfo(obj) { //编辑保存岗位编制信息
  return request({
    url: '/personnel/hzPersonnelRolePlan/updateRolePlan ',
    method: 'post',
    data: obj
  })
}

export function getExcelAllList(obj) { //编制信息列表页excel导出
  return request({
    url: '/personnel/hzPersonnelRolePlan/selectRolePlanForexcel',
    method: 'get',
    params: obj
  })
}
