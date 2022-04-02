import {
  UserOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from './AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/user-dashboard`,
  title: 'Home',
  icon: UserOutlined,
  breadcrumb: true,
  submenu: [{
    key: 'manage-users',
    path: `${APP_PREFIX_PATH}/user-dashboard`,
    title: 'Manage users',
    icon: UserOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'manage-users-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/manage-users-list`,
        title: 'User list',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-user-roles-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/manage-user-roles-list`,
        title: 'Role list',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-user-groups-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/manage-user-groups-list`,
        title: 'Group',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-user-audit-logs',
        path: `${APP_PREFIX_PATH}/user-dashboard/manage-user-audit-logs`,
        title: 'Audit logs',
        icon: '',
        breadcrumb: true,
        submenu: []
      }]
  },
  {
    key: 'manage-devices',
    path: `${APP_PREFIX_PATH}/user-dashboard`,
    title: 'Manage devices',
    icon: DatabaseOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'manage-device-type-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-type-list`,
        title: 'Device type list',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-device-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-list`,
        title: 'Device list',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-device-type-audit-logs',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-type-audit-logs`,
        title: 'Device type audit logs',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-device-audit-logs',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-audit-logs`,
        title: 'Device audit logs',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
    ]
  }]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
