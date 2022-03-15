import React from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from '../../constants';
import { APP_NAME } from 'configs/AppConfig';

const getLogoWidthGutter = (props: { mobileLogo?: any; navCollapsed?: any; navType?: any; }, isMobile: boolean) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  if(isMobile && !props.mobileLogo) {
    return 0
  }
  if(isNavTop) {
    return 'auto'
  }
  if(navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`
  } else {
    return `${SIDE_NAV_WIDTH}px`
  }
}

const getLogo = (props: { navCollapsed: any; logoType: any; }) => {
  const { navCollapsed, logoType } = props;
  if(logoType === 'light') {
    if(navCollapsed) {
      return '/img/logo-sm-white.png'
    }
    return '/img/logo-white.png'
  }

  if (navCollapsed) {
    return '/img/logo-sm.png'
  }
  return '/img/logo.png'
}

const getLogoDisplay = (isMobile: boolean, mobileLogo: any) => {
  if(isMobile && !mobileLogo) {
    return 'd-none'
  } else {
    return 'logo'
  }
}

export const Logo = (props: { mobileLogo?: any; navCollapsed: any; navType?: any; logoType: any; }) => {
  // const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  const isMobile = false
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)} 
      style={{width: `${getLogoWidthGutter(props, isMobile)}`}}>
      <img src={getLogo(props)} alt={`${APP_NAME} logo`}/>
    </div>
  )
}

export default Logo;
