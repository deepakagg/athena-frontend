import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import navigationConfig from "configs/NavigationConfig";
// import IntlMessage from 'components/util-components/IntlMessage';

let breadcrumbData: any = { 
	'/app' : "Home",
};

navigationConfig.forEach((elm, i) => {
	const assignBreadcrumb = (obj: {path: string, title: string}) => breadcrumbData[obj.path] = obj.title;
	assignBreadcrumb(elm);
	if (elm.submenu) {
		elm.submenu.forEach( elm => {
			assignBreadcrumb(elm)
			if(elm.submenu) {
				elm.submenu.forEach( elm => {
					assignBreadcrumb(elm)
				})
			}
		})
	}
})

const BreadcrumbRoute = withRouter(props => {
	const { location } = props;
	const pathSnippets = location.pathname.split('/').filter(i => i);
	const buildBreadcrumb = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbData[url]}</Link>
      </Breadcrumb.Item>
    );
	});
  
  return (
		<Breadcrumb>
			{buildBreadcrumb}
		</Breadcrumb>
  );
});

export class AppBreadcrumb extends Component {
	render() {
		return (
			<BreadcrumbRoute />
		)
	}
}

export default AppBreadcrumb
