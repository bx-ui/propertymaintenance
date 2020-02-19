import request from '@/router/axios'

export function getPage(query) {
    return request({
        url: '/maintenance/hzSettlement/page',
        method: 'get',
        params: query
    })
}

export function getYsListByJs(query) {
    return request({
        url: '/maintenance/hzSettlement/getYsListByJs',
        method: 'get',
        params: query
    })
}

export function getZrRatioByMaintenanceId(id) {
    return request({
        url: '/maintenance/hzSettlement/getZrRatioByMaintenanceId/'+id,
        method: 'get',
        // params: id
    })
}

export function detail(id) {
    return request({
        url: '/maintenance/hzSettlement/getJsDetailsById/'+id,
        method: 'get',
        // params: id
    })
}

export function add(data) {
    return request({
        url: '/maintenance/hzSettlement/addSettlement/',
        method: 'post',
        data: data
    })
}