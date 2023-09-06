import {
  HomeIcon,
  UserIcon,
  DocumentReportIcon,
  ChartBarIcon,
} from '@heroicons/vue/outline'

const HomePage = () => import('modules/home/component/HomePage.vue')
const Login = () => import('modules/auth/views/login.vue')
const NotFound = () => import('modules/pages/views/404.vue')
const Dashboard = () => import('modules/dashboard/views/index.vue')
const Profile = () => import('modules/profile/views/index.vue')
const Reports = () => import('modules/reports/views/index.vue')
const CreateReport = () => import('modules/reports/views/components/create-report.vue')
const ReportsTable = () => import('modules/table/views/index.vue')

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
    meta: {
      title: 'Trang chủ',
      requiresAuth: false
    }
  },
  {
    path: '/reports',
    component: Reports,
    name: 'Reports',
    meta: {
      title: 'Báo cáo',
      requiresAuth: false,
      layout: 'report',
      isReportLayout: true,
    },
  },
  {
    path: '/create-report',
    component: CreateReport,
    name: 'CreateReport',
    meta: {
      title: 'Tạo báo cáo',
      requiresAuth: false,
      layout: 'report',
      isReportLayout: true, },
  },
  {
    path: '/dashboard',
    component: ReportsTable,
    name: 'Dashboard',
    meta: {
      title: 'Báo cáo',
      icon: DocumentReportIcon,
      color: 'text-warning-410',
      requiresAuth: true,
    },
  },
  {
    path: '/statistic',
    component: Dashboard,
    name: 'Statistic',
    meta: {
      title: 'Phân tích',
      icon: ChartBarIcon,
      color: 'text-indigo-410',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: {
      title: 'Trang cá nhân',
      icon: UserIcon,
      color: 'text-success-50',
      isDarkBackground: true,
      isFullWidthLayout: true,
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound',
    meta: {
      requiresAuth: false,
    },
  },
]

export default routes
