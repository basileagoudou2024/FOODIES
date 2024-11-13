import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RestaurantsPage from '../views/RestaurantsPage.vue';
import RegisterConfirmPage from '../views/RegisterConfirmPage.vue';

// Définir les routes
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/restaurants',
    name: 'restaurants_page',
    component: RestaurantsPage,
    meta: { requiresAuth: true },
  },

  {
    path: '/registerConfirm',
    name: 'RegisterConfirm',
    component: RegisterConfirmPage,
    meta: { requiresAuth: false },
  }
];

// Créer le router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de vérification d'authentification
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('userToken'));
 // const hasValidatedCode = Boolean(localStorage.getItem('validatedCode'));

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated /*&& !hasValidatedCode*/) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router;
