import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${AUTH_PREFIX_PATH}/login`}
          component={lazy(() => import(`./authentication/login`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/signup`}
          component={lazy(() => import(`./authentication/signup`))}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
