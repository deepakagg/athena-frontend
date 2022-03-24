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
        key: 'manage-device-list',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-list`,
        title: 'Device type list',
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
