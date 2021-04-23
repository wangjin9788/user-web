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
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden: true
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '营销', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden: true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden: true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden: true
      }
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
        meta: {title: '添加发酵信息'},
        hidden: true
      },
      {
        path: 'updateBreed',
        name: 'updateBreed',
        component: () => import('@/views/breed/breedInfo/update'),
        meta: {title: '修改发酵信息'},
        hidden: true
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/breed/breedInfo/detail/index'),
        meta: {title: '养殖详情信息'},
        hidden: true
      },
      {
        path: 'addBreedDetail',
        name: 'addBreedDetail',
        component: () => import('@/views/breed/breedInfo/detail/add'),
        meta: {title: '添加发酵详情'},
        hidden: true
      },
      {
        path: 'updateFermentationDetail',
        name: 'updateFermentationDetail',
        component: () => import('@/views/breed/breedInfo/detail/update'),
        meta: {title: '修改发酵详情'},
        hidden: true
      },
      {
        path: 'breedPatter',
        name: 'breedPatter',
        component: () => import('@/views/breed/breedPatter/index'),
        meta: {title: '养殖模式'},
      },
      {
        path: 'addPatter',
        name: 'addPatter',
        component: () => import('@/views/breed/breedPatter/add'),
        meta: {title: '添加模式'},
        hidden: true
      },
      {
        path: 'updatePatter',
        name: 'updatePatter',
        component: () => import('@/views/breed/breedPatter/update'),
        meta: {title: '修改模式'},
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

