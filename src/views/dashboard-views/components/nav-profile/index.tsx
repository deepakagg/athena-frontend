import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
// import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined, 
  ShopOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from '../icon';
// import { signOut } from 'redux/actions/Auth';

const menuItem = [
	{
		title: "Edit Profile",
		icon: EditOutlined ,
		path: "/"
    },
    
    {
		title: "Account Setting",
		icon: SettingOutlined,
		path: "/"
    },
    {
		title: "Billing",
		icon: ShopOutlined ,
		path: "/"
	},
    {
		title: "Help Center",
		icon: QuestionCircleOutlined,
		path: "/"
	}
]

export const NavProfile = (props: {signOut: any}) => {
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
          {/* {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon type={el.icon} className=''/>
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })} */}
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

// export default connect(null, {signOut})(NavProfile)
export default NavProfile;
