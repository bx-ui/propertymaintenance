import request from '@/router/axios'//程傲的

export function getList(obj) {
  return request({
    url: '/plan/order/pageOrder',
    method: 'post',
    data: obj
  })
}
//导出
export function exportList(data){
    return request({
        url:'/plan/order/exportOrder',
        method:"get",
        params:data
    })
}
//根据id 查询
export function getDetail(data){
  return request({
      url:'/plan/order/queryOrderByPK',
      method:"post",
      data:data
  })
}
//考核的下拉

export function getCheck(data){
  return request({
      url:'/plan/check/getCheckList',
      method:"post",
      data:data
  })
}
//闭单

export function closeOrder(data){
  return request({
      url:'/plan/order/updateOrder',
      method:"post",
      data:data
  })
}
export function getProjectName(data){
  return request({
      url: '/plan/hzMaintenancePlan/getHzMaintenanceBasicPlaceForPlan',
      method: 'post',
      data: data
    })
}
//
export function getProject(data){
  return request({
      url: '/plan/hzMaintenancePlan/getProjactForPlan',
      method: 'post',
      data: data
    })
}

export function getSclass(data){
  return request({
      url: '/plan/hzMaintenancePlan/getSclassForPlan',
      method: 'post',
      data: data
    })
}

export function getmoney(data){
  return request({
      url: '/plan/check/getCheckAmount',
      method: 'post',
      data: data
    })
}

export function reCheck(data){
  return request({
      url: '/plan/order/fsOrder',
      method: 'post',
      data: data
    })
}

//查询评价
export function checkContent(data){
  return request({
      url: 'plan/orderCheck/getOrderCheckList',
      method: 'post',
      data: data
    })
}
//驳回
export function backCloses(data){
  return request({
      url: '/plan/order/rejectOrder',
      method: 'post',
      data: data
    })
}