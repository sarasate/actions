import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Archive from './views/Archive';
import Login from './components/Login';
import { TokenService } from './services/storage.service';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    { path: '/archive', name: 'archive', component: Archive },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true, loggedOutOnly: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const loggedOutOnly = to.matched.some(record => record.meta.loggedOutOnly);
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && loggedOutOnly) {
    return next('/');
  }

  next();
});

export default router;
