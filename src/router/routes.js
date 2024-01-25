import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: () => import('src/pages/sign-in.vue') },
  { path: '/sign-up', component: () => import('src/pages/sign-up.vue') },
  {
    path: '/manager',
    component: () => import('src/layouts/ManagerSpvLayout.vue'),
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: () => import('pages/spv-manager/Dashboard.vue') },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: () => import('pages/spv-manager/Create.vue') },
      { path: 'edit', meta: { title: 'EDIT TASK' }, component: () => import('pages/spv-manager/Edit.vue') },
      { path: 'task_monitoring',  meta: { title: 'TASK MONITORING' }, component: () => import('pages/spv-manager/task_monitoring.vue') },
      { path: 'task_monitoring_2',  meta: { title: 'TASK ACC' }, component: () => import('pages/spv-manager/task_monitoring_2.vue') },
      { path: 'report', meta: { title: 'REPORTS' }, component: () => import('pages/spv-manager/Report.vue') },
      { path: 'report_2', meta: { title: 'REPORTS' }, component: () => import('pages/spv-manager/Report_2.vue') },
      { path: 'report_3', meta: { title: 'REPORTS' }, component: () => import('pages/spv-manager/Report_3.vue') },
    ],
 },
  {
    path: '/worker',
    component: () => import('src/layouts/WorkerLayout.vue'),
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: () => import('pages/worker/Dashboard.vue') },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: () => import('pages/worker/Create_task.vue') },
      { path: 'task_detail', meta: { title: 'TASK DETAIL' }, component: () => import('pages/worker/Task_detail.vue') },
      { path: 'task_detail_2', meta: { title: 'TASK DETAIL' }, component: () => import('pages/worker/Task_detail_2.vue') },
      { path: 'task_detail_3', meta: { title: 'TASK DETAIL' }, component: () => import('pages/worker/Task_detail_3.vue') },
      { path: 'task_list',  meta: { title: 'TASK LIST' }, component: () => import('pages/worker/Task_list.vue') },
    ],
 },

  // { path: '/', component: () => import('src/pages/sign-up.vue') },
  // { path: '/sign-in', component: () => import('src/pages/sign-in.vue') },
  // {
  //   path: "/",
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '/index', component: () => import('pages/Index.vue') },
  //     { path: '/Create', component: () => import('pages/spv-manager/Create.vue') },
  //     { path: '/task_monitoring', component: () => import('pages/spv-manager/task_monitoring.vue') },
  //     { path: '/task_list', component: () => import('pages/worker/Task_list.vue') },
  //     { path: '/Task_detail', component: () => import('pages/worker/Task_detail.vue') },
  //     { path: '/Report', component: () => import('pages/spv-manager/Report.vue') },
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },

]

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
      next('/');
  } else {
      next();
  }
});


export default routes
