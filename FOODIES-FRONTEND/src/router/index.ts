import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/RegisterUser.vue';
import RestaurantList from '@/views/RestaurantList.vue';

// Définir les routes
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/restaurants',
    name: 'RestaurantList',
    component: RestaurantList,
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
