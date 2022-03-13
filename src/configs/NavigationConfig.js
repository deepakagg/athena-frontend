import {
  RobotOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from './AppConfig'

const dashBoardNavTree = [{
  key: 'manage',
  path: `${APP_PREFIX_PATH}/`,
  title: 'Manage',
  icon: RobotOutlined,
  breadcrumb: false,
  submenu: [{
    key: 'manage-users',
    path: `${APP_PREFIX_PATH}/`,
    title: 'Manage users',
    icon: RobotOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'manage-users-list',
        path: `${APP_PREFIX_PATH}/app/manage-users-list`,
        title: 'User list',
        icon: '',
        breadcrumb: true,
        submenu: []
      },
      {
        key: 'manage-user-audit-logs',
        path: `${APP_PREFIX_PATH}/app/manage-user-audit-logs`,
        title: 'Audit logs',
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
