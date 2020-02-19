import request from '@/router/axios'//

export function getList(obj) {
  return request({
    url: '/plan/amount/pageOrderForAmount',
    method: 'post',
    data: obj
  })
}