import Sample from '@/component/Sample';

export default {
  routes: [
    {
      path: '/',
      name: 'Sample',
      meta: { auth: false },
      component: Sample,
    },
  ],
};
