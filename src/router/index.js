import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/moose', name: 'moose', component: () => import('../views/BrotherhoodView.vue') },
    { path: '/volunteer', name: 'volunteer', component: () => import('../views/VolunteerView.vue') },
    { path: '/running-club', name: 'running-club', component: () => import('../views/RunningClubView.vue') },
    { path: '/bronze-club', redirect: '/running-club' },
    { path: '/schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue') },
    { path: '/articles', name: 'articles', component: () => import('../views/ArticlesView.vue') },
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue') },
    { path: '/news/:slug', name: 'news-detail', component: () => import('../views/NewsDetailView.vue') },
    { path: '/contacts', name: 'contacts', component: () => import('../views/ContactsView.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyView.vue') },
    { path: '/terms', name: 'terms', component: () => import('../views/TermsView.vue') },
    { path: '/brotherhood', redirect: '/moose' },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
