import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RestaurantsPage from '../views/RestaurantsPage.vue';

// Définir les routes
const routes = [
  {
    path: '/',
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
];

// Créer le router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de vérification d'authentification
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('userToken')); // Modifier cette ligne selon votre logique d'authentification

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
