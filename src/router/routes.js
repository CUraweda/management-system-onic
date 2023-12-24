
const routes = [
  { path: '/', component: () => import('src/pages/sign-up.vue') },
  { path: '/sign-in', component: () => import('src/pages/sign-in.vue') },
  {
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/Create', component: () => import('pages/spv-manager/Create.vue') },
      { path: '/task_monitoring', component: () => import('pages/spv-manager/task_monitoring.vue') },
      { path: '/task_list', component: () => import('pages/worker/Task_list.vue') },
      { path: '/Task_detail', component: () => import('pages/worker/Task_detail.vue') },
      { path: '/Report', component: () => import('pages/spv-manager/Report.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },

]


export default routes
