import JSSdkDemo from '@/component/JSSdkDemo';
import Login from '@/component/Login';

export default {
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { auth: false },
      component: Login,
    },
    {
      path: '/jssdkdemo/:id',
      name: 'JSSdkDemo',
      meta: { auth: false },
      component: JSSdkDemo,
    },
  ],
};
