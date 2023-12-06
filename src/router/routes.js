
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Index', component: () => import('pages/Index.vue') },
      { path: '/Create', component: () => import('pages/Create.vue') },
      { path: '/Task', component: () => import('pages/Task.vue') },
      { path: '/Task_list', component: () => import('pages/Task_list.vue') },
      { path: '/Report', component: () => import('pages/Report.vue') },
      
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
