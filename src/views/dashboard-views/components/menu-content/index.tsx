import React from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import Icon from "../icon";
import navigationConfig from "configs/NavigationConfig";
// import { connect } from "react-redux";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "../../constants";
import { LocationDescriptor, Location } from "history";
// import { onMobileNavToggle } from "redux/actions/Theme";

const { SubMenu } = Menu;


const setDefaultOpen = (key: string) => {
    let keyList = [];
    let keyString = "";
    if (key) {
        const arr = key.split("-");
        for (let index = 0; index < arr.length; index++) {
            const elm = arr[index];
            index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
            keyList.push(keyString);
        }
    }
    return keyList;
};

const SideNavContent = (props: { sideNavTheme: any; routeInfo: any; hideGroupTitle: any; localization: any; onMobileNavToggle: any; }) => {
    const { sideNavTheme, routeInfo, hideGroupTitle, localization, onMobileNavToggle } = props;
    const isMobile = false;
    const closeMobileNav = () => {
        if (isMobile) {
            onMobileNavToggle(false)
        }
    }
    return (
        <Menu
            // theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
            theme={'light'}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={[routeInfo?.key]}
            defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
            className={hideGroupTitle ? "hide-group-title" : ""}
        >
            {navigationConfig.map((menu) =>
                menu.submenu.length > 0 ? (
                    <Menu.ItemGroup
                        key={menu.key}
                        title={menu.title}
                    >
                        {menu.submenu.map((subMenuFirst: any) =>
                            subMenuFirst.submenu.length > 0 ? (
                                <SubMenu
                                    icon={
                                        subMenuFirst.icon ? (
                                            <Icon type={subMenuFirst?.icon} className='' />
                                        ) : null
                                    }
                                    key={subMenuFirst.key}
                                    title={subMenuFirst.title}
                                >
                                    {subMenuFirst.submenu.map((subMenuSecond: { key: React.Key | null | undefined; icon: any; title: any; path: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>); }) => (
                                        <Menu.Item key={subMenuSecond.key}>
                                            {subMenuSecond.icon ? (
                                                <Icon type={subMenuSecond?.icon} className='' />
                                            ) : null}
                                            <span>
                                                {subMenuSecond.title}
                                            </span>
                                            <Link onClick={() => closeMobileNav()} to={subMenuSecond.path} />
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            ) : (
                                <Menu.Item key={subMenuFirst.key}>
                                    {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} className='' /> : null}
                                    <span>{subMenuFirst.title}</span>
                                    <Link onClick={() => closeMobileNav()} to={subMenuFirst.path} />
                                </Menu.Item>
                            )
                        )}
                    </Menu.ItemGroup>
                ) : (
                    <Menu.Item key={menu.key}>
                        {menu.icon ? <Icon type={menu?.icon} className='' /> : null}
                        <span>{menu?.title}</span>
                        {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path} /> : null}
                    </Menu.Item>
                )
            )}
        </Menu>
    );
};

// const TopNavContent = (props: { topNavColor: any; localization: any; }) => {
//     const { topNavColor, localization } = props;
//     return (
//         <Menu mode="horizontal" style={{ backgroundColor: topNavColor }}>
//             {navigationConfig.map((menu) =>
//                 menu.submenu.length > 0 ? (
//                     <SubMenu
//                         key={menu.key}
//                         popupClassName="top-nav-menu"
//                         title={
//                             <span className="d-flex align-items-center">
//                                 {menu.icon ? <Icon type={menu?.icon} className='' /> : null}
//                                 <span>{menu.title}</span>
//                             </span>
//                         }
//                     >
//                         {menu.submenu.map((subMenuFirst: any) =>
//                             subMenuFirst.submenu.length > 0 ? (
//                                 <SubMenu
//                                     key={subMenuFirst.key}
//                                     popupClassName="top-nav-menu"
//                                     icon={
//                                         subMenuFirst.icon ? (
//                                             <Icon type={subMenuFirst?.icon} className='' />
//                                         ) : null
//                                     }
//                                     title={subMenuFirst.title}
//                                 >
//                                     {subMenuFirst.submenu.map((subMenuSecond: any) => (
//                                         <Menu.Item key={subMenuSecond.key}>
//                                             <span>
//                                                 {subMenuSecond.title}
//                                             </span>
//                                             <Link to={subMenuSecond.path} />
//                                         </Menu.Item>
//                                     ))}
//                                 </SubMenu>
//                             ) : (
//                                 <Menu.Item key={subMenuFirst.key}>
//                                     {subMenuFirst.icon ? (
//                                         <Icon type={subMenuFirst?.icon} className='' />
//                                     ) : null}
//                                     <span>{subMenuFirst.title}</span>
//                                     <Link to={subMenuFirst.path} />
//                                 </Menu.Item>
//                             )
//                         )}
//                     </SubMenu>
//                 ) : (
//                     <Menu.Item key={menu.key}>
//                         {menu.icon ? <Icon type={menu?.icon} className='' /> : null}
//                         <span>{menu?.title}</span>
//                         {menu.path ? <Link to={menu.path} /> : null}
//                     </Menu.Item>
//                 )
//             )}
//         </Menu>
//     );
// };

const MenuContent = (props: { sideNavTheme: any; routeInfo: any; hideGroupTitle: any; localization: any; onMobileNavToggle: any; }) => {
    return <SideNavContent {...props} />
};

// const mapStateToProps = ({ theme }) => {
//   const { sideNavTheme, topNavColor } = theme;
//   return { sideNavTheme, topNavColor };
// };

// export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
export default MenuContent;
