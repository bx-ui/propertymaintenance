import request from '@/router/axios';

// export function addObj(obj) {
//   return request({
//     url: '/admin/syspost/',
//     method: 'post',
//     data: obj
//   })
// }

export function getList(query) {
  return request({
    url: '/maintenance/hzpropertymaintenance/page',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return request({
    url: '/maintenance/hzpropertymaintenance/' + id,
    method: 'get',
  })
}

export function getProviders(id) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisSupplierListByProjectUuid',
    method: "get",
    params: id
  })
}

export function getProvidersWithoutUUid(id) {
  return request({
    url: '/maintenance/hzBasis/getHzBasisSupplierList',
    method: "get",
    params: id
  })
}

export function sendThirdRepair(obj) {
  return request({
    url: '/maintenance/hzpropertymaintenance/saveHzPropertyMaintenancePlan',
    method: 'post',
    data: obj
  })
}

export function saveResponse(obj) {
  return request({
    url: '/maintenance/hzpropertymaintenance/saveHzPropertyDutyAllocation',
    method: 'post',
    data: obj
  })
}

// export function getMaterial() { //已废弃
//   return request({
//     url: '/maintenance/hzBasis/getHzBasisMaterialList',
//     method: 'get',
//   })
// }

export function saveCost(obj) {
  return request({
    url: '/maintenance/hzpropertymaintenance/saveHzPropertyBudget',
    method: 'post',
    data: obj
  })
}

export function getApproval(obj) { //审批 1-同意 0-驳回
  return request({
    url: '/maintenance/hzpropertymaintenance/approvalBudget',
    method: 'get',
    params: obj
  })
}

export function getApprovalHistory(obj) {
  return request({
    url: '/maintenance/hzpropertymaintenance/getProcessFlowHistoryList',
    method: 'get',
    params: obj
  })
}

export function handleButtons(obj) { //维修单管理页面按钮组(发函/暂停发函,作废,跳单,通知第三方)
  return request({
    url: '/maintenance/hzpropertymaintenance/updateMaintenanceState',
    method: 'post',
    data: obj
  })
}

export function handleResend(obj) { //维修单管理页面
  return request({
    url: '/maintenance/hzpropertymaintenance/resend',
    method: 'get',
    params: obj
  })
}


export function responseApproval(obj) { //责任划分审批
  return request({
    url: '/maintenance/hzpropertymaintenance/approvalDuty',
    method: 'get',
    params: obj
  })
}

// getRepairExcel
export function getRepairExcel(obj) { //维修单管理列表导出
  return request({
    url: '/maintenance/hzpropertymaintenance/exportMaintenanceList',
    method: 'get',
    params: obj
  })
}

export function getOneToEndList(obj) { //维修单一票到底列表页面
  return request({
    url: '/maintenance/hzTz/getYpddListPage',
    method: 'get',
    params: obj
  })
}
  
// getRepairExcel
export function getOneToEndExcel(obj) { //维修单一票到底列表导出
  return request({
    url: '/maintenance/hzTz/getYpddList',
    method: 'get',
    params: obj
  })
}

export function getDryerHistory(obj) { //获取催单记录接口
  return request({
    url: 'maintenance/hzpropertymaintenance/getReminderLogById/' + obj,
    method: 'get',
  })
}
