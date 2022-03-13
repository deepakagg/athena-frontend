import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import { Route, Switch } from "react-router-dom";

import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout";
import LandingLayout from "layouts/landing-layout";
import React from "react";
import useBodyClass from "hooks/useBodyClass";

export const Views = (props: Record<string, any>) => {
  return (
    <Switch>
      <Route exact path={'/'}>
        <LandingLayout {...props} />
      </Route>
      <Route path={AUTH_PREFIX_PATH}>
        <AuthLayout {...props} />
      </Route>
      <Route path={APP_PREFIX_PATH}>
        <DashboardLayout {...props} />
      </Route>
    </Switch>
  );
};

export default Views;
//export default connect(mapStateToProps)(Views);
