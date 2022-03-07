import {
  DIR_LTR,
  NAV_TYPE_SIDE,
  SIDE_NAV_LIGHT,
} from "constants/ThemeConstants";

import { env } from "./EnvironmentConfig";

export const APP_NAME = "Emilus";
export const API_BASE_URL = "http://localhost:8000";
export const APP_PREFIX_PATH = "/app";
export const AUTH_PREFIX_PATH = "/auth";

export const THEME_CONFIG = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: "en",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#3e82f7",
  headerNavColor: "",
  mobileNav: false,
  currentTheme: "light",
  direction: DIR_LTR,
};
