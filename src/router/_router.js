const _import = require('./_import')
import Layout from '@/page/index/'
import demoLayout from '@/page/secondaryLayout'
import passwordLayout from '@/views/layout/passwordLayout'
import details from '@/views/requirement/require/details.vue'
export default [{
    path: '/',
    name: '主页',
    redirect: '/wel'
  }, {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      meta: {
        title: "首页"
      },
      component: _import('wel')
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }, {
    path: '/login',
    component: _import('login/index')
  }, {
    path: '/reset',
    component: _import('layout/passwordLayout', 'views'),
  }, {
    path: '/authredirect',
    name: '授权页',
    component: _import('login/authredirect')
  }, {
    path: '/lock',
    name: '锁屏页',
    component: _import('lock/index')
  }, {
    path: '/crud',
    component: Layout,
    redirect: '/crud/index',
    children: [{
      path: 'index',
      name: 'crud实例',
      meta: {
        title: "crud实例"
      },
      component: _import('crud/index', 'views')
    }]
  },
  //  {
  //     path: '/sexcel',
  //     component: Layout,
  //     redirect: '/sexcel/index',
  //     children: [{
  //       path: 'index',
  //       name: 'Excel案例',
  //       meta:{
  //         title:"Excel案例"
  //       },
  //       component: _import('sexcel/index', 'views')
  //     }]
  // },
  {
    path: '/demo',
    component: Layout,
    children: [{
      path: 'index',
      meta: {
        title: 'demo列表',
      },
      component: demoLayout,
      children: [{
        path: '',
        meta: {
          title: 'demo列表',
        },
        name: 'demo列表',
        component: _import('demo/index', 'views'),
      }, {
        path: ':id',
        meta: {
          title: 'demo详情',
        },
        name: 'demo详情',
        component: _import('demo/detail', 'views'),
      }]
    }]
  },
  {
    path: '/repairManager',
    component: Layout,
    children: [{
      path: 'index',
      meta: {
        title: "维修单详情",
      },
      name: '维修单详情',
      component: _import('repairManager/detailList/Details', 'views')
    }]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
      path: 'index',
      meta: {
        title: '修改信息',
      },
      name: '修改信息',
      component: _import('admin/user/info', 'views')
    }]
  }, {
    path: '/404',
    component: _import('error-page/404', 'components'),
    name: '404'
  }, {
    path: '/403',
    component: _import('error-page/403', 'components'),
    name: '403'
  }, {
    path: '/500',
    component: _import('error-page/500', 'components'),
    name: '500'
  }, {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    meta: {
      keepAlive: true
    },
    children: [{
      path: ':routerPath',
      name: 'iframe',
      component: _import('iframe/main', 'components'),
      props: true
    }]
  },
  {
    path: '/hzpropertyrepair',
    component: Layout,
    redirect: '/hzpropertyrepair',
    meta: {
      // keepAlive: true,
      title: "报表新增",
    },
    children: [{
      path: '/maintenance/hzpropertyrepair/add',
      name: '报表新增',
      meta: {
        title: "新增"
      },
      component: () => import("@/views/maintenance/hzpropertyrepair/add"),
      props: true
    }]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message',
    meta: {
      // keepAlive: true,
      title: "员工信息新增",
    },
    children: [{
      path: '/maintenance/peopleMessage/message/add',
      name: '员工信息新增',
      meta: {
        title: "员工信息新增"
      },
      component: () => import("@/views/maintenance/peopleMessage/message/add"),
      props: true
    }]
  },
  {
    path: '/listData',
    component: Layout,
    redirect: '/listData',
    meta: {
      // keepAlive: true,
      title: "巡检新增",
    },
    children: [{
      path: '/maintenance/onSetInspection/listData/add',
      name: '巡检新增',
      meta: {
        title: "巡检新增"
      },
      component: () => import("@/views/maintenance/onSetInspection/listData/add"),
      props: true
    }]
  },
  {
    path: '/listData',
    component: Layout,
    redirect: '/listData',
    meta: {
      // keepAlive: true,
      title: "巡检详情",
    },
    children: [{
      path: '/maintenance/onSetInspection/listData/edit',
      name: '巡检详情',
      meta: {
        title: "巡检详情"
      },
      component: () => import("@/views/maintenance/onSetInspection/listData/edit"),
      props: true
    }]
  },
  {
    path: '/acceptance',
    component: Layout,
    redirect: '/acceptance',
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/maintenance/acceptance/edit',
      name: '验收详情',
      meta: {
        title: "详情"
      },
      component: () => import("@/views/maintenance/acceptance/edit"),
      props: true
    }]
  },
  {
    path: '/approval',
    component: Layout,
    redirect: '/approval',
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/maintenance/approval/edit',
      name: '验收单审批详情',
      meta: {
        title: "详情"
      },
      component: () => import("@/views/maintenance/approval/edit"),
      props: true
    }]
  },
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement',
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/maintenance/settlement/add',
      name: '结算管理新增',
      meta: {
        title: "新增"
      },
      component: () => import("@/views/maintenance/settlement/add"),
      props: true
    }]
  },
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement',
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/maintenance/settlement/edit',
      name: '结算管理详情',
      meta: {
        title: "详情"
      },
      component: () => import("@/views/maintenance/settlement/edit"),
      props: true
    }]
  },
  //wq 王青

  {
    path: '/ordermanage',
    component: Layout,
    redirect: '/protectCenter/ordermanage',
    meta: {
      title: "维保工单评价"
    },
    children: [{
      path: '/protectCenter/ordermanage/handle',
      name: '操作',
      meta: {
        title: "操作"
      },
      component: () => import("@/views/protectCenter/ordermanage/handle"),
      props: true
    }]
  },
  {
    path: '/planmanage',
    component: Layout,
    redirect: '/protectCenter/planmanage',
    meta: {
      title: "维保计划"
    },
    children: [{
      path: '/protectCenter/planmanage/add',
      name: '新增',
      meta: {
        title: "新增"
      },
      component: () => import("@/views/protectCenter/planmanage/add"),
      props: true
    }]
  },
  //修改
  {
    path: '/planmanage',
    component: Layout,
    redirect: '/protectCenter/planmanage',
    meta: {
      title: "维保计划"
    },
    children: [{
      path: '/protectCenter/planmanage/edit',
      name: '修改',
      meta: {
        title: "修改"
      },
      component: () => import("@/views/protectCenter/planmanage/edit"),
      props: true
    }]
  },
  //一票到底的另一个查看页面
  {
    path: '/onepage',
    component: Layout,
    redirect: '/onepage',
    meta: {
      title: "维保计划"
    },
    children: [{
      path: '/protectCenter/onepage/see',
      name: '查看',
      meta: {
        title: "查看"
      },
      component: () => import("@/views/protectCenter/onepage/see"),
      props: true
    }]
  },
  //新增
  {
    path: '/confirm',
    component: Layout,
    redirect: '/protectCenter/confirm',
    meta: {
      title: "维保计划管理"
    },
    children: [{
      path: '/protectCenter/confirm/add',
      name: '新增',
      meta: {
        title: "新增"
      },
      component: () => import("@/views/protectCenter/confirm/add"),
      props: true
    }]
  },
  //编辑
  {
    path: '/confirm',
    component: Layout,
    redirect: '/protectCenter/confirm',
    meta: {
      title: "维保计划管理"
    },
    children: [{
      path: '/protectCenter/confirm/edit',
      name: '编辑',
      meta: {
        title: "编辑"
      },
      component: () => import("@/views/protectCenter/confirm/edit"),
      props: true
    }]
  },
  {
    path: '/jobManager',
    component: Layout,
    children: [{
      path: 'insert',
      meta: {
        title: "新增岗位",
      },
      name: '新增岗位',
      component: _import('jobManager/Insert', 'views')
    }]
  },
  {
    path: '/jobManager',
    component: Layout,
    children: [{
      path: 'details',
      meta: {
        title: "岗位详情",
      },
      name: '岗位详情',
      component: _import('jobManager/Details', 'views')
    }]
  },
  {
    path: '/jobWeave',
    component: Layout,
    children: [{
      path: 'insert',
      meta: {
        title: "新增编制",
      },
      name: '新增编制',
      component: _import('jobWeave/Insert', 'views')
    }]
  },
  {
    path: '/jobWeave',
    component: Layout,
    children: [{
      path: 'details',
      meta: {
        title: "编制管理",
      },
      name: '编制管理',
      component: _import('jobWeave/Details', 'views')
    }]
  },
  {
    path: '/requirement',
    component: Layout,
    children: [{
      path: 'details',
      meta: {
        title: "需求管理详情",
      },
      name: '需求管理详情',
      component: details,
    }]
  },
  {
    path: '/requirement',
    component: Layout,
    children: [{
      path: 'insert',
      meta: {
        title: "需求管理新增",
      },
      name: '需求管理新增',
      component: _import('requirement/require/insert', 'views')
    }]
  },
  // {
  //   path: '/requireApproval',
  //   component: Layout,
  //   children: [{
  //     path: 'approval',
  //     meta: {
  //       title: "需求管理审批页面",
  //     },
  //     name: '需求管理审批详情',
  //     component: _import('requirement/requireApproval/details', 'views')
  //   }]
  // },
  {
    path: '/requireApproval',
    component: Layout,
    children: [{
      path: 'details',
      meta: {
        title: "需求管理审批详情",
      },
      name: '需求管理审批详情',
      component: _import('requirement/requireApproval/details', 'views')
    }]
  },
]
