import request from '@/router/axios'

//查询字典类型树
export function dictTypeTree(obj) {
  return request({
    url: '/maintenance/hzBasisDic/list',
    method: 'get',
    params: obj
  })
}

//新增字典类型
export function addDictType(obj) {
  return request({
    url: '/maintenance/hzBasisDic/add',
    method: 'post',
    data: obj
  })
}

//删除字典类型
export function delDictType(obj) {
  return request({
    url: '/maintenance/hzBasisDic/delete',
    method: 'get',
    params: obj
  })
}

//修改字典类型
export function putDictType(obj) {
  return request({
    url: '/admin/sysdicttype/',
    method: 'put',
    data: obj
  })
}

//字典列表
export function dictIndexList(typeId) {
  return request({
    url: '/admin/sysdictindex/selectDictIndex',
    method: 'get',
    params: {
      typeId: typeId
    }
  })
}

//字典新增
export function addDictIndex(obj) {
  return request({
    url: '/maintenance/hzBasisDic/add',
    method: 'post',
    data: obj
  })
}

//字典删除
export function delDictIndex(obj) {
  return request({
    url: '/maintenance/hzBasisDic/delete',
    method: 'get',
    params: obj
  })
}

//字典修改
export function putDictIndex(obj) {
  return request({
    url: '/maintenance/hzBasisDic/update',
    method: 'post',
    data: obj
  })
}

//字典明细新增
export function addDict(obj) {
  return request({
    url: '/maintenance/hzBasisDic/add',
    method: 'post',
    data: obj
  })
}

//字典明细获取
// export function getDict(id) {
//   return request({
//     url: '/admin/sysdict/' + id,
//     method: 'get'
//   })
// }

//字典明细删除
export function delDict(obj) {
  return request({
    url: '/maintenance/hzBasisDic/delete',
    method: 'get',
    params: obj
  })
}

//字典明细更新
export function putDict(obj) {
  return request({
    url: '/maintenance/hzBasisDic/update',
    method: 'post',
    data: obj
  })
}

//作废
export function deleteApplication(obj) {
  return request({
    url: '/maintenance/hzPropertyApplication/deleteApplication',
    method: 'post',
    data: obj
  })
}
