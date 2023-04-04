// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/auth/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signin',
        component: () => import('@/views/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Overview.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/Overview.vue'),
      },
      {
        path: 'bookings',
        component: () => import('@/views/Bookings.vue'),
      },
      {
        path: 'subscription ',
        component: () => import('@/views/Subscription.vue'),
      },
      {
        path: 'jobs',
        component: () => import('@/views/Jobs.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/Profiles.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/profile/Profiles.vue')
          },
          {
            path: ':id',
            component: () => import('@/views/profile/Profile.vue')
          }
        ]
      },
      {
        path: 'artizans',
        component: () => import('@/views/Artizans.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/artizans/Artizans.vue')
          },
          {
            path: ':id',
            component: () => import('@/views/artizans/Artizan.vue')
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
