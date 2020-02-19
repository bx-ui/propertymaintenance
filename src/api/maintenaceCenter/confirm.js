import request from '@/router/axios'//

export function getList(obj) {
  return request({
    url: '/plan/confirm/pageOrderForConfirm',
    method: 'post',
    data: obj
  })
}
//确认按钮

export function confirmList(id) {
    return request({
      url: '/plan/confirm/confirmOrders?ids='+id,
      method: 'post',
      data: {}
    })
  }
//导出

export function exportMoudle(data) {
    return request({
      url: '/plan/confirm/exportModule?cmodul='+data,
      method: 'post',
      responseType: 'arraybuffer',
      data: {}
    })
  }
//获取维保位置 也就是楼栋

export function getBuildNum(data) {
  return request({
    url: '/plan/hzMaintenancePlan/getBuildNum',
    method: 'post',
    data: data
  })
}
//获取维保编号

export function getCode(data) {
  return request({
    url: '/plan/hzMaintenancePlan/getElevNum',
    method: 'post',
    data: data
  })
}
//新增保存接口

export function saveAdd(data) {
  return request({
    url: '/plan/order/saveOrder',
    method: 'post',
    data: data
  })
}
//批量新增

export function saveAddMore(data) {
  return request({
    url: '/plan/confirm/importOrders',
    method: 'post',
    data: data
  })
}
export function getProject(data){
  return request({
      url: '/plan/hzMaintenancePlan/getProjactForPlan',
      method: 'post',
      data: data
    })
}
export function getDetail(data){
 
  return request({
    url: ' /plan/order/queryOrderByPK',
    method: 'post',
    data: data
  })
}
// 获取人员
export function getPeople(data) {
  return request({
    url: '/plan/hzMaintenancePlan/getSupplier',
    method: 'post',
    data: data
  })
}
//编辑

export function update(data) {
  return request({
    url: '/plan/order/updateOrder',
    method: 'post',
    data: data
  })
}
//未确认的可以删除

export function delPlan(data) {
  return request({
    url: '/plan/order/delOrder?id='+data,
    method: 'post',
    data: {}
  })
}