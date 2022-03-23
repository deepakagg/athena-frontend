import {
  RobotOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from './AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/user-dashboard`,
  title: 'Home',
  icon: RobotOutlined,
  breadcrumb: true,
  submenu: [{
    key: 'manage-users',
    path: `${APP_PREFIX_PATH}/user-dashboard`,
    title: 'Manage users',
    icon: RobotOutlined,
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
      },
      {
        key: 'manage-device-template',
        path: `${APP_PREFIX_PATH}/user-dashboard/device-template`,
        title: 'Device template',
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
