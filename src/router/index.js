import Vue from 'vue';
import Router from 'vue-router';
import MainWindow from '@/components/pages/main-window/';
import Session from '@/components/pages/session/';
import Event from '@/components/pages/event/';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainWindow',
      component: MainWindow,
    },
    {
      path: '/:id',
      name: 'Session',
      component: Session,
    },
    {
      path: '/event/:id',
      name: 'Event',
      component: Event,
    }
  ],
});
