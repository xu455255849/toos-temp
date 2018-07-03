const loginPage = r => require.ensure([], () => r(require('../page/login')), 'login');

/**
 * 一个路由钩子，可以验证是否登陆
 */
/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (sessionStorage.getItem('user') !== '' && sessionStorage.getItem('user') !== null) {
      next();
    } else {
      Message.error('请先登录！');
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
});*/