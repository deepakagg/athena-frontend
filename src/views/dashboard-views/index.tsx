import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { APP_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";
import UserDashboard from "./user-dashboard";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          exact
          path={`${APP_PREFIX_PATH}/`}
          component={UserDashboard}
        />
        <Route
          path={`${APP_PREFIX_PATH}/user-dashboard`}
          component={UserDashboard}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
