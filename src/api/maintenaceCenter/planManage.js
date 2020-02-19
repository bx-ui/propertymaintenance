import request from '@/router/axios'

export function getList(data) {
  return request({
    url: '/plan/hzMaintenancePlan/page',
    method: 'get',
    params: data
  })
};
//删除
export function deleteArr(data) {
    return request({
      url: '/plan/hzMaintenancePlan/deleteHzMaintenancePlan',
      method: 'post',
      data: data
    })
  }
//导出
export function getAllData(data){
    return request({
        url: '/plan/hzMaintenancePlan/downloadHzMaintenancePlanExcel',
        method: 'post',
        data: data
      })
}
//获取维保类型

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
//获取位置描述
export function getPlaceDesc(data){
  return request({
      url: '/plan/hzMaintenancePlan/getPlaceDescribeForPlan',
      method: 'post',
      data: data
    })
}
//增加提交的接口
export function addSubmit(data){
  return request({
      url: '/plan/hzMaintenancePlan/savaHzMaintenancePlan',
      method: 'post',
      data: data
    })
}
//修改查询的接口
export function getDetail(data){
  return request({
      url: '/plan/hzMaintenancePlan/id',
      method: 'get',
      params: data
    })
}
//修改的接口

export function updateSubmit(data){
  return request({
      url: '/plan/hzMaintenancePlan/updateHzMaintenancePlan',
      method: 'post',
      data: data
    })
}
//发布
export function publish(data){
  return request({
      url: '/plan/hzMaintenancePlan/publishPlans?ids='+data,
      method: 'post',
      data: data
    })
}
//获取维保
export function getCmodul(data){
  return request({
      url: '/plan/hzMaintenancePlan/getModulesForPlan',
      method: 'post',
      data: data
    })
}
//获取维保大类

export function getBclass(data){
  return request({
      url: '/plan/hzMaintenancePlan/getBclassForPlan',
      method: 'post',
      data: data
    })
}
//获取小类

export function getSclass(data){
  return request({
    url: '/plan/hzMaintenancePlan/getSclassForPlan',
    method: 'post',
    data: data
  })
}