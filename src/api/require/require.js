import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/maintenance/hzPropertyApplication/getPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/maintenance/hzPropertyApplication/getPage',
    method: 'post',
    data: obj
  })
}

export function saveData(obj) {
  return request({
    url: '/maintenance/hzPropertyApplication/save',
    method: 'post',
    data: obj
  })
}

export function getdata(obj) { //详情页面获取数据
  return request({
    url: '/maintenance/hzPropertyApplication/getAcceptanceExamineDetail',
    method: 'get',
    params: obj
  })
}

export function saveEditData(obj) {
  return request({
    url: '/maintenance/hzPropertyApplication/updateHzApplication',
    method: 'post',
    data: obj
  })
}

export function submitApprovalOpnion(obj) {
  return request({
    url: '/maintenance/hzPropertyApplication/agreeHzAcceptance',
    method: 'GET',
    params: obj
  })
}
