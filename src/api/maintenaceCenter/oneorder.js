import request from '@/router/axios'//程傲的

export function getList(obj) {
  return request({
    url: '/plan/order/census',
    method: 'post',
    data: obj
  })
}
//获取项目
export function getProjectName(data){
  return request({
      url: '/plan/hzMaintenancePlan/getProjactForPlan',
      method: 'post',
      data: data
    })
}
//获取分期
export function getProjectTimes(data){
  return request({
      url: '/plan/hzMaintenancePlan/getProjectTimesForPlan',
      method: 'post',
      data: data
    })
}
//获取位置

export function getPlace(data){
  return request({
      url: '/plan/hzMaintenancePlan/getPlaceForPlan',
      method: 'post',
      data: data
    })
}
export function getOneList(obj) {
  return request({
    url: '/plan/order/pageOrder',
    method: 'post',
    data: obj
  })
}