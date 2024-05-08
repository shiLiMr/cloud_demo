import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const dynamicRoutes: RouteRecordRaw[] = [
  {
    // 主页
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home', // 首页
        name: 'Home',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          cache: false,// 该页面是否需要缓存 false不缓存
          hidden: false,// 是否显示在菜单中
        }
      },
      {
        path: '/system', // 系统管理
        name: 'System',
        meta: {
          title: '系统管理',
          icon: 'Setting',
          cache: false,// 该页面是否需要缓存 false不缓存
          hidden: false,// 是否显示在菜单中
        },
        redirect: '/system/menu',
        children: [
          {
            path: '/system/menu',// 菜单管理
            name: 'Menu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: {
              title: '菜单管理',
              icon: 'Menu',
              cache: false,// 该页面是否需要缓存 false不缓存
              hidden: false,// 是否显示在菜单中
            }
          },
          {
            path: '/system/role',// 角色管理
            name: 'Role',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
              title: '角色管理',
              icon: 'User',
              cache: false,// 该页面是否需要缓存 false不缓存
              hidden: false,// 是否显示在菜单中
            }
          },
          {
            path: '/system/user',// 用户管理
            name: 'User',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'UserFilled',
              cache: false,// 该页面是否需要缓存 false不缓存
              hidden: false,// 是否显示在菜单中
            }
          }
        ]
      },
      {
        path: '/goods',  // 商品管理
        name: 'Goods',
        meta: {
          title: '商品管理',
          icon: 'ShoppingCart',
          cache: false,// 该页面是否需要缓存 false不缓存
          hidden: false,// 是否显示在菜单中
        },
        redirect: '/goods/list',
        children: [
          {
            path: '/goods/list',// 商品列表
            name: 'List',
            component: () => import('@/views/goods/list/index.vue'),
            meta: {
              title: '商品列表',
              icon: 'List',
              cache: false,// 该页面是否需要缓存 false不缓存
              hidden: false,// 是否显示在菜单中
            }
          },
          {
            path: '/goods/category',// 商品分类
            name: 'Category',
            component: () => import('@/views/goods/category/index.vue'),
            meta: {
              title: '商品分类',
              icon: 'Grid',
              cache: false,// 该页面是否需要缓存 false不缓存
              hidden: false,// 是否显示在菜单中
            }
          },
        ]
      },
      {
        path:'/usian', // 积云官网
        name:'Usian',
        component:()=>import('@/views/usian/index.vue'),
        meta:{
          title:'积云官网',
          icon:'Document',
          cache:false,// 该页面是否需要缓存 false不缓存
          hidden:false,// 是否显示在菜单中
        }
      },
      {
        path:'/401',
        name:'notfound',
        component:()=>import('@/views/error/401/index.vue'),
        meta:{
          title:'401',
          icon:'Document',
          cache:false,// 该页面是否需要缓存 false不缓存
          hidden:true,// 是否显示在菜单中 
        }
      },
      {
        path:'/:pathMatch(.*)*',
        name:'noFound',
        component:()=>import('@/views/error/404/index.vue'),
        meta:{
          title:'404',
          icon:'Document',
          cache:false,// 该页面是否需要缓存 false不缓存
          hidden:true,// 是否显示在菜单中
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes
})

export default router
