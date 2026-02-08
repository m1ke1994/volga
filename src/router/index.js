import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BrotherhoodView from '../views/BrotherhoodView.vue'
import VolunteerView from '../views/VolunteerView.vue'
import RunningClubView from '../views/RunningClubView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import NewsView from '../views/NewsView.vue'
import ContactsView from '../views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/brotherhood', name: 'brotherhood', component: BrotherhoodView },
    { path: '/volunteer', name: 'volunteer', component: VolunteerView },
    { path: '/running-club', name: 'running-club', component: RunningClubView },
    { path: '/bronze-club', name: 'bronze-club', component: RunningClubView },
    { path: '/schedule', name: 'schedule', component: ScheduleView },
    { path: '/articles', name: 'articles', component: ArticlesView },
    { path: '/news', name: 'news', component: NewsView },
    { path: '/contacts', name: 'contacts', component: ContactsView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
