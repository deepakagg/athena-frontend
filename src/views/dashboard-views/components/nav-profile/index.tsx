import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import authService from '../../../../services/authService';

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/"
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/"
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/"
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/"
  }
]

export const NavProfile = (props: { signOut: any, dispatch: any }) => {
  const profileImg = "/img/avatars/avatar-common.png";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <span>{authService.getUserEmail()}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item key={menuItem.length + 1} onClick={e => props.signOut()}>
            <span>
              <LogoutOutlined />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile;
