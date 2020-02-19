import request from '@/router/axios'
//获取列表数据
export function getList(obj) {
    return request({
        url: '/property/hzproperty/page',
        method: 'post',
        data: obj
    })
}
//根据id查询详细信息
export function getInfo(obj) {
    return request({
      url: '/property/hzproperty/',
      method: 'post',
      data: obj
    })
}
//文件批量上传
export function upLoadFile(arr){
    return request({
        url:"/property/hzproperty/upload",
        method:'post',
        files:arr,
        transformRequest: [function(){
            return arr;
        }],
        
    })
}
//物业费测算单条删除
export function Delete(id){
    return request({
        url:"/property/hzproperty/"+id,
        method:'delete'
    })
}
//物业费测算修改
export function Update(obj){
    return request({
        url:"/property/hzproperty/update",
        method:'post',
        data:obj,
        transformRequest: [function(){
            return obj;
        }],
    })
}
//物业费测算新增
export function Add(obj){
    return request({
        method:'post',
        data: obj,
        transformRequest: [function(){
            return obj;
        }],
        url:"/property/hzproperty/save",
        transformRequest: [function(){
            return obj;
        }],
    })
}
//根据id获取物业费测算信息接口
export function Hzproperty(id){
    return request({
        url:"/property/hzproperty/"+id,
        method:'GET',
    })
}
//发起审批/property/bpm/start
export function start(obj) {
    return request({
        url: '/property/bpm/start',
        method: 'post',
        data:obj
    })
}
// 审批办理接口
// /property/bpm/handle
export function handle(obj) {
    return request({
        url: '/property/bpm/handle',
        method: 'get',
        params:obj
    })
}
// 审批详情列表接口
export function processList(obj) {
    return request({
        url: '/property/bpm/processList',
        method: 'get',
        params: obj
    })
}
// 审核情况接口/property/bpm/audit
export function audit(obj) {
    return request({
        url: '/property/bpm/audit',
        method: 'get',
        params: obj
    })
}
//获取代办条数
export function ApprovalsCount(obj) {
    return request({
        url: '/bpm/getApprovalsCount',
        method: 'get',
        data: obj
    })
}
// 首页待办列表获取接口
// 
export function bpmList() {
    return request({
        url: '/property/bpm/list',
        method: 'get',
    })
}
//项目接口下拉菜单
export function getPro() {
    return request({
        url: '/property/hzproperty/getProject',
        method: 'get',
    })
}