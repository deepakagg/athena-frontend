import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { APP_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/user-dashboard`}
          component={lazy(() => import(`./user-dashboard`))}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
