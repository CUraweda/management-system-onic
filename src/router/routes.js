import Vue from 'vue';
import VueRouter from 'vue-router';

// sign in & up (if needed)
import SignIn from 'src/pages/sign-in.vue';
import SignUp from 'src/pages/sign-up.vue';

// layout
import DirectorLayout from 'src/layouts/DirectorLayout.vue';
import OperatorLayout from 'src/layouts/OperatorLayout.vue';
import ManagerLayout from 'src/layouts/ManagerLayout.vue';
import SupervisorLayout from 'src/layouts/SupervisorLayout.vue';
import WorkerLayout from 'src/layouts/WorkerLayout.vue';

// Operator
import OperatorDashboard from 'pages/operator/Dashboard.vue';
import OperatorCreateTask from 'pages/operator/Create.vue';
import OperatorEditTask from 'pages/operator/Edit.vue';
import OperatorTaskMonitoring from 'pages/operator/task_monitoring.vue';
import OperatorTaskMonitoring2 from 'pages/operator/task_monitoring_2.vue';
import OperatorTaskMonitoring3 from 'pages/operator/task_monitoring_3.vue';
import OperatorReport from 'pages/operator/Report.vue';
import OperatorReport2 from 'pages/operator/Report_2.vue';
import OperatorReport3 from 'pages/operator/Report_3.vue';

// Director
import DirectorDashboard from 'pages/director/Dashboard.vue';
import DirectorCreateTask from 'pages/director/Create.vue';
import DirectorEditTask from 'pages/director/Edit.vue';
import DirectorTaskMonitoring from 'pages/director/task_monitoring.vue';
import DirectorTaskMonitoring2 from 'pages/director/task_monitoring_2.vue';
import DirectorTaskMonitoring3 from 'pages/director/task_monitoring_3.vue';
import DirectorReport from 'pages/director/Report.vue';
import DirectorReport2 from 'pages/director/Report_2.vue';
import DirectorReport3 from 'pages/director/Report_3.vue';

// manager
import ManagerDashboard from 'pages/manager/Dashboard.vue';
import ManagerCreateTask from 'pages/manager/Create.vue';
import ManagerEditTask from 'pages/manager/Edit.vue';
import ManagerTaskMonitoring from 'pages/manager/task_monitoring.vue';
import ManagerTaskMonitoring2 from 'pages/manager/task_monitoring_2.vue';
import ManagerTaskMonitoring3 from 'pages/manager/task_monitoring_3.vue';
import ManagerReport from 'pages/manager/Report.vue';
import ManagerReport2 from 'pages/manager/Report_2.vue';
import ManagerReport3 from 'pages/manager/Report_3.vue';

// supervisor
import SupervisorDashboard from 'pages/supervisor/Dashboard.vue';
import SupervisorCreateTask from 'pages/supervisor/Create.vue';
import SupervisorEditTask from 'pages/supervisor/Edit.vue';
import SupervisorTaskMonitoring from 'pages/supervisor/task_monitoring.vue';
import SupervisorTaskMonitoring2 from 'pages/supervisor/task_monitoring_2.vue';
import SupervisorTaskMonitoring3 from 'pages/supervisor/task_monitoring_3.vue';
import SupervisorReport from 'pages/supervisor/Report.vue';
import SupervisorReport2 from 'pages/supervisor/Report_2.vue';
import SupervisorReport3 from 'pages/supervisor/Report_3.vue';

// worker
import WorkerDashboard from 'pages/worker/Dashboard.vue';
import WorkerCreateTask from 'pages/worker/Create_task.vue';
import WorkerTaskDetail from 'pages/worker/Task_detail.vue';
import WorkerTaskDetail2 from 'pages/worker/Task_detail_2.vue';
import WorkerTaskDetail3 from 'pages/worker/Task_detail_3.vue';
import WorkerTaskList from 'pages/worker/Task_list.vue';
import Error404 from 'pages/Error404.vue';

const routes = [
  { path: '/', component: SignIn },
  { path: '/sign-up', component: SignUp },
  {
    path: '/operator',
    component: OperatorLayout,
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: OperatorDashboard },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: OperatorCreateTask },
      { path: 'edit', meta: { title: 'EDIT TASK' }, component: OperatorEditTask },
      { path: 'task_monitoring',  meta: { title: 'TASK MONITORING' }, component: OperatorTaskMonitoring },
      { path: 'task_monitoring_2',  meta: { title: 'TASK ACC' }, component: OperatorTaskMonitoring2 },
      { path: 'task_monitoring_3',  meta: { title: 'DELETED TASK' }, component: OperatorTaskMonitoring3 },
      { path: 'report/:id', meta: { title: 'REPORTS' }, component: OperatorReport },
      { path: 'report_2/:id', meta: { title: 'REPORTS' }, component: OperatorReport2 , props: true },
      { path: 'report_3/:id', meta: { title: 'REPORTS' }, component: OperatorReport3 , props: true },
    ],
  },
  {
    path: '/director',
    component: DirectorLayout,
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: DirectorDashboard },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: DirectorCreateTask },
      { path: 'edit', meta: { title: 'EDIT TASK' }, component: DirectorEditTask },
      { path: 'task_monitoring',  meta: { title: 'TASK MONITORING' }, component: DirectorTaskMonitoring },
      { path: 'task_monitoring_2',  meta: { title: 'TASK ACC' }, component: DirectorTaskMonitoring2 },
      { path: 'task_monitoring_3',  meta: { title: 'DELETED TASK' }, component: DirectorTaskMonitoring3 },
      { path: 'report/:id', meta: { title: 'REPORTS' }, component: DirectorReport },
      { path: 'report_2/:id', meta: { title: 'REPORTS' }, component: DirectorReport2 , props: true },
      { path: 'report_3/:id', meta: { title: 'REPORTS' }, component: DirectorReport3 , props: true },
    ],
  },
  {
    path: '/manager',
    component: ManagerLayout,
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: ManagerDashboard },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: ManagerCreateTask },
      { path: 'edit/:id', meta: { title: 'EDIT TASK' }, component: ManagerEditTask, props: true },
      { path: 'task_monitoring',  meta: { title: 'TASK MONITORING' }, component: ManagerTaskMonitoring },
      { path: 'task_monitoring_2',  meta: { title: 'TASK ACC' }, component: ManagerTaskMonitoring2 },
      { path: 'task_monitoring_3',  meta: { title: 'DELETED TASK' }, component: ManagerTaskMonitoring3 },
      { path: 'report/:id', meta: { title: 'REPORTS' }, component: ManagerReport , props: true },
      { path: 'report_2/:id', meta: { title: 'REPORTS' }, component: ManagerReport2 , props: true },
      { path: 'report_3/:id', meta: { title: 'REPORTS' }, component: ManagerReport3 , props: true },
    ],
  },
  {
    path: '/supervisor',
    component: SupervisorLayout,
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: SupervisorDashboard },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: SupervisorCreateTask },
      { path: 'edit/:id', meta: { title: 'EDIT TASK' }, component: SupervisorEditTask },
      { path: 'task_monitoring',  meta: { title: 'TASK MONITORING' }, component: SupervisorTaskMonitoring },
      { path: 'task_monitoring_2',  meta: { title: 'TASK ACC' }, component: SupervisorTaskMonitoring2 },
      { path: 'task_monitoring_3',  meta: { title: 'DELETED TASK' }, component: SupervisorTaskMonitoring3 },
      { path: 'report', meta: { title: 'REPORTS' }, component: SupervisorReport , props: true },
      { path: 'report_2/:id', meta: { title: 'REPORTS' }, component: SupervisorReport2 , props: true },
      { path: 'report_3/:id', meta: { title: 'REPORTS' }, component: SupervisorReport3 , props: true },
    ],
  },
  {
    path: '/worker',
    component: WorkerLayout,
    children: [
      { path: 'dashboard', meta: { title: 'DASHBOARD' }, component: WorkerDashboard },
      { path: 'create', meta: { title: 'CREATE TASK' }, component: WorkerCreateTask },
      { path: 'task_detail/:id', meta: { title: 'TASK DETAIL' }, component: WorkerTaskDetail, props: true },
      { path: 'task_detail_2/:id', meta: { title: 'TASK DETAIL' }, component: WorkerTaskDetail2, props: true },
      { path: 'task_detail_3/:id', meta: { title: 'TASK DETAIL' }, component: WorkerTaskDetail3, props: true },
      { path: 'task_list',  meta: { title: 'TASK LIST' }, component: WorkerTaskList },
    ],
  },
  // ... other routes ...
  {
    path: '*',
    component: Error404,
  },
];

// const router = new VueRouter({
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');

//   if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default routes;
