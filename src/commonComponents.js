import commonTitle from '@/components/common/CommonTitle'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('commonTitle', commonTitle)
}

export default plugin