import { Route, Switch } from "react-router-dom";

import AuthViews from "views/auth-views";
import React, { useEffect } from "react";
import authService from '../../services/authService';
import { useHistory } from "react-router-dom";

export const AuthLayout = () => {
  const history = useHistory();

  useEffect(() => {
    authService.refreshUserAccess().then((response) => {
      if (response) {
        history.push("/app/user-dashboard");
      }
    });
  });

  return (
    <div className="auth-container">
      <Switch>
        <Route path="" component={AuthViews} />
      </Switch>
    </div>
  );
};

export default AuthLayout;
