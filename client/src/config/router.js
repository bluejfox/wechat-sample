import A from '@/component/A';
import B from '@/component/B';
import C from '@/component/C';
import D from '@/component/D';
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
    {
      path: '/aaa',
      name: 'A',
      meta: { auth: false },
      component: A,
    },
    {
      path: '/bbbb',
      name: 'B',
      meta: { auth: false },
      component: B,
    },
    {
      path: '/ccccc',
      name: 'C',
      meta: { auth: false },
      component: C,
    },
    {
      path: '/dddddd',
      name: 'D',
      meta: { auth: false },
      component: D,
    },
  ],
};
