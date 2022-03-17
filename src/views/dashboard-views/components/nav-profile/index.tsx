import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  updateCreateUserModalViewState,
} from '../../dashboardSlice';


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
            <h4 className="mb-0">Fname Lname</h4>
            <span className="text-muted">Designation</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item key={menuItem.length + 1} onClick={(e) => props.dispatch(updateCreateUserModalViewState(true))}>
            <span>
              <UserAddOutlined />
              <span className="font-weight-normal">Create user</span>
            </span>
          </Menu.Item>
          <Menu.Item key={menuItem.length + 2} onClick={e => props.signOut()}>
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
