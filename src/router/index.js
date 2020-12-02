import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/front'
    },
    {
      path: '/front',
      component: () => import( '../views/front/login'),
    },
    {
      path: '/main',
      component: () => import( '../views/front/main/Index'),
      children: [
        {
          path: '/',
          component: () => import('../views/front/main/bookSearch/BookSearch.vue'),
          meta: {title: '书籍搜索'}
        },
        {
          path: 'mySubscribe',
          component: () => import('../views/front/main/mySubscribe/MySubscribe.vue'),
          meta: {title: '我的订阅'}
        },
        {
          path: 'bookDetail',
          name:'bookDetail',
          component: () => import('../views/front/main/components/BookDetail.vue'),
          meta: {title: '图书详情'}
        },
        {
          path: 'bookCollection',
          name:'bookCollection',
          component: () => import('../views/front/main/bookCollection/BookCollection.vue'),
          meta: {title: '图书收藏'}
        },
        {
          path: 'personalInfo',
          component: () => import('../views/front/main/personalInfo/PersonalInfo.vue'),
          meta: {title: '个人信息'}
        }
      ]
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      meta: {title: '自述文件'},
      children: [
        {
          path: '/dashboard',
          component: () => import('../components/page/Dashboard.vue'),
          meta: {title: '系统首页'}
        },
        {
          path: '/icon',
          component: () => import('../components/page/Icon.vue'),
          meta: {title: '自定义图标'}
        },
        {
          path: '/readerManage',
          component: () => import('../components/page/ReaderManage.vue'),
          meta: {title: '用户管理'}
        },
        {
          path: '/bookManage',
          component: () => import('../components/page/BookManage.vue'),
          meta: { title: '图书管理' }
        },
        {
          path: '/tabs',
          component: () => import('../components/page/Tabs.vue'),
          meta: {title: '公告管理'}
        },
        {
          path: '/approvalManage',
          component: () => import('../components/page/ApprovalManage.vue'),
          meta: {title: '借阅审批'}
        },
        {
          path: '/bookReturnManage',
          component: () => import('../components/page/BookReturnManage.vue'),
          meta: {title: '归还审批'}
        },
        {
          path: '/bookLends',
          component: () => import('../components/page/AllBookLends.vue'),
          meta: {title: '完成借阅'}
        },
        {
          path: '/readerLoginLog',
          component: () => import('../components/page/ReaderLoginLog.vue'),
          meta: {title: '读者登录日志'}
        },
        {
          path: '/404',
          component: () => import( '../components/page/404.vue'),
          meta: {title: '404'}
        },
        {
          path: '/403',
          component: () => import( '../components/page/403.vue'),
          meta: {title: '403'}
        }
      ]
    },
    {
      path: '/login',
      component: () => import( '../components/page/Login.vue'),
      meta: {title: '登录'}
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});
