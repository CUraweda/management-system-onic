import Vue from "vue";
import VueRouter from "vue-router";

// sign in & up (if needed)
import SignIn from "src/pages/sign-in.vue";
import SignUp from "src/pages/sign-up.vue";

// layout
import DirectorLayout from "src/layouts/DirectorLayout.vue";
import OperatorLayout from "src/layouts/OperatorLayout.vue";
import ManagerLayout from "src/layouts/ManagerLayout.vue";
import AdminLayout from "src/layouts/AdminLayout.vue";
import SupervisorLayout from "src/layouts/SupervisorLayout.vue";

// Director
import DirectorDashboard from "pages/director/Dashboard.vue";
import DirectorCreateTask from "pages/director/Create.vue";
import DirectorEditTask from "pages/director/Edit.vue";
import DirectorTaskMonitoring from "pages/director/task_monitoring.vue";
import DirectorTaskMonitoring2 from "pages/director/task_monitoring_2.vue";
import DirectorTaskMonitoring3 from "pages/director/task_monitoring_3.vue";
import DirectorReport from "pages/director/Report.vue";

// manager
import ManagerDashboard from "pages/manager/Dashboard.vue";
import ManagerCreateTask from "pages/manager/Create.vue";
import ManagerEditTask from "pages/manager/Edit.vue";
import ManagerTaskMonitoring from "pages/manager/task_monitoring.vue";
import ManagerTaskMonitoring2 from "pages/manager/task_monitoring_2.vue";
import ManagerTaskMonitoring3 from "pages/manager/task_monitoring_3.vue";
import ManagerReport from "pages/manager/Report.vue";
import ManagerTaskList from "pages/manager/Task_list.vue";
import ManagerTaskDetail from "pages/manager/Task_detail.vue";
import ManagerTaskDetail2 from "pages/manager/Task_detail_2.vue";
import UploadManager from "pages/manager/upload.vue";

// supervisor
import SupervisorDashboard from "pages/supervisor/Dashboard.vue";
import SupervisorCreateTask from "pages/supervisor/Create.vue";
import SupervisorEditTask from "pages/supervisor/Edit.vue";
import SupervisorTaskMonitoring from "pages/supervisor/task_monitoring.vue";
import SupervisorTaskMonitoring2 from "pages/supervisor/task_monitoring_2.vue";
import SupervisorTaskMonitoring3 from "pages/supervisor/task_monitoring_3.vue";
import SupervisorTaskList from "pages/supervisor/Task_list.vue";
import SupervisorTaskDetail from "pages/supervisor/Task_detail.vue";
import SupervisorTaskDetail2 from "pages/supervisor/Task_detail_2.vue";
import SupervisorReport from "pages/supervisor/Report.vue";
import UploadSupervisor from "pages/supervisor/upload.vue";

// operator
import OperatorDashboard from "pages/operator/Dashboard.vue";
import OperatorCreateTask from "pages/operator/Create_task.vue";
import OperatorTaskDetail from "pages/operator/Task_detail.vue";
import OperatorTaskDetail2 from "pages/operator/Task_detail_2.vue";
import OperatorTaskList from "pages/operator/Task_list.vue";

// admin
import AdminadminDashboard from "pages/Admin/adminDashboard.vue";

import Error404 from "pages/Error404.vue";

const routes = [
  { path: "/", component: SignIn },
  { path: "/sign-up", component: SignUp },
  {
    path: "/director",
    component: DirectorLayout,
    children: [
      {
        path: "dashboard",
        meta: { title: "DASHBOARD" },
        component: DirectorDashboard,
      },
      {
        path: "create",
        meta: { title: "CREATE TASK" },
        component: DirectorCreateTask,
      },
      {
        path: "edit",
        meta: { title: "EDIT TASK" },
        component: DirectorEditTask,
        props: true,
      },
      {
        path: "task_monitoring",
        meta: { title: "TASK MONITORING" },
        component: DirectorTaskMonitoring,
      },
      {
        path: "task_monitoring_2",
        meta: { title: "TASK ACC" },
        component: DirectorTaskMonitoring2,
      },
      {
        path: "task_monitoring_3",
        meta: { title: "DELETED TASK" },
        component: DirectorTaskMonitoring3,
      },
      {
        path: "report",
        meta: { title: "REPORTS" },
        component: DirectorReport,
        props: true,
      },
    ],
  },
  {
    path: "/manager",
    component: ManagerLayout,
    children: [
      {
        path: "dashboard",
        meta: { title: "DASHBOARD" },
        component: ManagerDashboard,
      },
      {
        path: "create",
        meta: { title: "CREATE TASK" },
        component: ManagerCreateTask,
      },
      {
        path: "edit",
        meta: { title: "EDIT TASK" },
        component: ManagerEditTask,
        props: true,
      },
      {
        path: "task_monitoring",
        meta: { title: "TASK MONITORING" },
        component: ManagerTaskMonitoring,
      },
      {
        path: "task_monitoring_2",
        meta: { title: "TASK ACC" },
        component: ManagerTaskMonitoring2,
      },
      {
        path: "task_list",
        meta: { title: "TASK LIST" },
        component: ManagerTaskList,
      },
      {
        path: "task_detail",
        meta: { title: "TASK DETAIL" },
        component: ManagerTaskDetail,
        props: true,
      },
      {
        path: "task_detail_2",
        meta: { title: "TASK DETAIL" },
        component: ManagerTaskDetail2,
        props: true,
      },
      {
        path: "task_monitoring_3",
        meta: { title: "DELETED TASK" },
        component: ManagerTaskMonitoring3,
      },
      {
        path: "report",
        meta: { title: "REPORTS" },
        component: ManagerReport,
        props: true,
      },
      {
        path: "upload",
        meta: { title: "UPLOAD" },
        component: UploadManager,
        props: true,
      },
    ],
  },
  {
    path: "/supervisor",
    component: SupervisorLayout,
    children: [
      {
        path: "dashboard",
        meta: { title: "DASHBOARD" },
        component: SupervisorDashboard,
      },
      {
        path: "create",
        meta: { title: "CREATE TASK" },
        component: SupervisorCreateTask,
      },
      {
        path: "edit",
        meta: { title: "EDIT TASK" },
        component: SupervisorEditTask,
        props: true,
      },
      {
        path: "task_monitoring",
        meta: { title: "TASK MONITORING" },
        component: SupervisorTaskMonitoring,
      },
      {
        path: "task_monitoring_2",
        meta: { title: "TASK ACC" },
        component: SupervisorTaskMonitoring2,
      },
      {
        path: "task_list",
        meta: { title: "TASK LIST" },
        component: SupervisorTaskList,
      },
      {
        path: "task_detail",
        meta: { title: "TASK DETAIL" },
        component: SupervisorTaskDetail,
        props: true,
      },
      {
        path: "task_detail_2",
        meta: { title: "TASK DETAIL" },
        component: SupervisorTaskDetail2,
        props: true,
      },
      {
        path: "task_monitoring_3",
        meta: { title: "DELETED TASK" },
        component: SupervisorTaskMonitoring3,
      },
      {
        path: "report",
        meta: { title: "REPORTS" },
        component: SupervisorReport,
        props: true,
      },
      {
        path: "upload",
        meta: { title: "UPLOAD" },
        component: UploadSupervisor,
        props: true,
      },
    ],
  },
  {
    path: "/operator",
    component: OperatorLayout,
    children: [
      {
        path: "dashboard",
        meta: { title: "DASHBOARD" },
        component: OperatorDashboard,
      },
      {
        path: "create",
        meta: { title: "CREATE TASK" },
        component: OperatorCreateTask,
      },
      {
        path: "task_detail",
        meta: { title: "TASK DETAIL" },
        component: OperatorTaskDetail,
        props: true,
      },
      {
        path: "task_detail_2",
        meta: { title: "TASK DETAIL" },
        component: OperatorTaskDetail2,
        props: true,
      },
      {
        path: "task_list",
        meta: { title: "TASK LIST" },
        component: OperatorTaskList,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        meta: { title: "DASHBOARD" },
        component: AdminadminDashboard,
      }
    ]
  },
  // ... other routes ...
  {
    path: "*",
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
