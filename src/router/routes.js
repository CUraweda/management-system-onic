
const routes = [
  { path: '/', component: () => import('src/pages/sign-up.vue') },
  { path: '/sign-in', component: () => import('src/pages/sign-in.vue') },
  {
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Index', component: () => import('pages/Index.vue') },
      { path: '/Create', component: () => import('src/pages/spv-manager/Create.vue') },
      { path: '/Task', component: () => import('src/pages/worker/Task.vue') },
      { path: '/Task_list', component: () => import('src/pages/worker/Task_list.vue') },
      { path: '/Report', component: () => import('src/pages/spv-manager/Report.vue') },

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
