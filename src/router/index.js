import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/task',
    component: Layout,
    redirect: '/task/taskInfo',
    name: 'task',
    meta: {title: '任务', icon: 'task'},
    children: [
      {
        path: 'taskInfo',
        name: 'taskInfo',
        component: () => import('@/views/task/taskInfo/index'),
        meta: {title: '任务信息'}
      },
      {
        path: 'addTask',
        name: 'addTask',
        component: () => import('@/views/task/taskInfo/add'),
        meta: {title: '添加任务'},
        hidden: true
      },
      {
        path: 'updateTask',
        name: 'updateTask',
        component: () => import('@/views/task/taskInfo/update'),
        meta: {title: '修改任务'},
        hidden: true
      },
    ]
  },
  {
    path: '/exp',
    component: Layout,
    redirect: '/exp/pay',
    name: 'exp',
    meta: {title: '支出/营收', icon: 'exp'},
    children: [
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/exp/pay/index'),
        meta: {title: '支出', icon: 'exp-pay'}
      },
      {
        path: 'revenue',
        name: 'revenue',
        component: () => import('@/views/exp/revenue/index'),
        meta: {title: '营收', icon: 'exp-role'}
      },
      {
        path: 'addRevenue',
        name: 'addRevenue',
        component: () => import('@/views/exp/revenue/add'),
        meta: {title: '添加营收'},
        hidden: true
      },
      {
        path: 'updateRevenue',
        name: 'updateRevenue',
        component: () => import('@/views/exp/revenue/update'),
        meta: {title: '修改营收'},
        hidden: true
      },
      {
        path: 'addPay',
        name: 'addPay',
        component: () => import('@/views/exp/pay/add'),
        meta: {title: '添加支出'},
        hidden: true
      },
      {
        path: 'updatePay',
        name: 'updatePay',
        component: () => import('@/views/exp/pay/update'),
        meta: {title: '修改支出'},
        hidden: true
      },
    ]
  },
  {
    path: '/fer',
    component: Layout,
    redirect: '/fer/fermentation',
    name: 'fer',
    meta: {title: '发酵管理', icon: 'fer'},
    children: [
      {
        path: 'fermentation',
        name: 'fermentation',
        component: () => import('@/views/fer/fermentation/index'),
        meta: {title: '发酵信息'}
      },
      {
        path: 'addFermentation',
        name: 'addFermentation',
        component: () => import('@/views/fer/fermentation/add'),
        meta: {title: '添加发酵信息'},
        hidden: true
      },
      {
        path: 'updateFermentation',
        name: 'updateFermentation',
        component: () => import('@/views/fer/fermentation/update'),
        meta: {title: '修改发酵信息'},
        hidden: true
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/fer/fermentation/detail/index'),
        meta: {title: '发酵详情信息'},
        hidden: true
      },
      {
        path: 'addFermentationDetail',
        name: 'addFermentationDetail',
        component: () => import('@/views/fer/fermentation/detail/add'),
        meta: {title: '添加发酵详情'},
        hidden: true
      },
      {
        path: 'updateFermentationDetail',
        name: 'updateFermentationDetail',
        component: () => import('@/views/fer/fermentation/detail/update'),
        meta: {title: '修改发酵详情'},
        hidden: true
      },
      {
        path: 'patter',
        name: 'patter',
        component: () => import('@/views/fer/patter/index'),
        meta: {title: '发酵模型'},
      },
      {
        path: 'addPatter',
        name: 'addPatter',
        component: () => import('@/views/fer/patter/add'),
        meta: {title: '添加模型'},
        hidden: true
      },
      {
        path: 'updatePatter',
        name: 'updatePatter',
        component: () => import('@/views/fer/patter/update'),
        meta: {title: '修改模型'},
        hidden: true
      },
    ]
  },
  {
    path: '/breed',
    component: Layout,
    redirect: '/breed/breedInfo',
    name: 'breed',
    meta: {title: '养殖管理', icon: 'breed'},
    children: [
      {
        path: 'breedInfo',
        name: 'breedInfo',
        component: () => import('@/views/breed/breedInfo/index'),
        meta: {title: '养殖信息'}
      },
      {
        path: 'addBreed',
        name: 'addBreed',
        component: () => import('@/views/breed/breedInfo/add'),
        meta: {title: '添加养殖信息'},
        hidden: true
      },
      {
        path: 'updateBreed',
        name: 'updateBreed',
        component: () => import('@/views/breed/breedInfo/update'),
        meta: {title: '修改养殖信息'},
        hidden: true
      },
      {
        path: 'breedDetail',
        name: 'breedDetail',
        component: () => import('@/views/breed/breedInfo/detail/index'),
        meta: {title: '养殖详情信息'},
        hidden: true
      },
      {
        path: 'addBreedDetail',
        name: 'addBreedDetail',
        component: () => import('@/views/breed/breedInfo/detail/add'),
        meta: {title: '添加养殖详情'},
        hidden: true
      },
      {
        path: 'updateBreedDetail',
        name: 'updateBreedDetail',
        component: () => import('@/views/breed/breedInfo/detail/update'),
        meta: {title: '修改养殖详情'},
        hidden: true
      },
      {
        path: 'breedPatter',
        name: 'breedPatter',
        component: () => import('@/views/breed/breedPatter/index'),
        meta: {title: '养殖模式'},
      },
      {
        path: 'addBreedPatter',
        name: 'addBreedPatter',
        component: () => import('@/views/breed/breedPatter/add'),
        meta: {title: '添加模式'},
        hidden: true
      },
      {
        path: 'updateBreedPatter',
        name: 'updateBreedPatter',
        component: () => import('@/views/breed/breedPatter/update'),
        meta: {title: '修改模式'},
        hidden: true
      },
      {
        path: 'breedOperation',
        name: 'breedOperation',
        component: () => import('@/views/breed/breedInfo/operation/index'),
        meta: {title: '养殖操作信息'},
        hidden: true
      },
      {
        path: 'addBreedOperation',
        name: 'addBreedOperation',
        component: () => import('@/views/breed/breedInfo/operation/add'),
        meta: {title: '添加操作信息'},
        hidden: true
      },
      {
        path: 'updateBreedOperation',
        name: 'updateBreedOperation',
        component: () => import('@/views/breed/breedInfo/operation/update'),
        meta: {title: '修改操作信息'},
        hidden: true
      },
      {
        path: 'breedTreatment',
        name: 'breedTreatment',
        component: () => import('@/views/breed/breedInfo/treatment/index'),
        meta: {title: '养殖药物治疗信息'},
        hidden: true
      },
      {
        path: 'addBreedTreatment',
        name: 'addBreedTreatment',
        component: () => import('@/views/breed/breedInfo/treatment/add'),
        meta: {title: '添加药物治疗信息'},
        hidden: true
      },
      {
        path: 'updateBreedTreatment',
        name: 'updateBreedTreatment',
        component: () => import('@/views/breed/breedInfo/treatment/update'),
        meta: {title: '修改药物治疗信息'},
        hidden: true
      },
      {
        path: 'breedMeasure',
        name: 'breedMeasure',
        component: () => import('@/views/breed/breedInfo/measure/index'),
        meta: {title: '养殖生长信息'},
        hidden: true
      },
      {
        path: 'addBreedMeasure',
        name: 'addBreedMeasure',
        component: () => import('@/views/breed/breedInfo/measure/add'),
        meta: {title: '添加生长信息'},
        hidden: true
      },
      {
        path: 'updateBreedMeasure',
        name: 'updateBreedMeasure',
        component: () => import('@/views/breed/breedInfo/measure/update'),
        meta: {title: '修改生长信息'},
        hidden: true
      },
      {
        path: 'breedEvaluate',
        name: 'breedEvaluate',
        component: () => import('@/views/breed/breedInfo/evaluate/index'),
        meta: {title: '养殖评价信息'},
        hidden: true
      },
      {
        path: 'addBreedEvaluate',
        name: 'addBreedEvaluate',
        component: () => import('@/views/breed/breedInfo/evaluate/add'),
        meta: {title: '添加评价信息'},
        hidden: true
      },
      {
        path: 'updateBreedEvaluate',
        name: 'updateBreedEvaluate',
        component: () => import('@/views/breed/breedInfo/evaluate/update'),
        meta: {title: '修改评价信息'},
        hidden: true
      },
      {
        path: 'summary',
        name: 'summary',
        component: () => import('@/views/breed/breedInfo/summary/index'),
        meta: {title: '养殖总结'},
        hidden: true
      },
      {
        path: 'pathology',
        name: 'pathology',
        component: () => import('@/views/breed/pathology/index'),
        meta: {title: '养殖病理信息'},
        hidden: true
      },
      {
        path: 'addBreedPathology',
        name: 'addBreedPathology',
        component: () => import('@/views/breed/pathology/add'),
        meta: {title: '添加病理信息'},
        hidden: true
      },
      {
        path: 'updateBreedPathology',
        name: 'updateBreedPathology',
        component: () => import('@/views/breed/pathology/update'),
        meta: {title: '修改病理信息'},
        hidden: true
      },
    ]
  },

  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

