import { Route, Switch } from "react-router-dom";

import UserDashboardViews from "views/dashboard-views";
import React, { useState, useEffect } from "react";
import authService from '../../services/authService';
import { useHistory } from "react-router-dom";

export const DashboardLayout = () => {
  const history = useHistory();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    authService.refreshUserAccess().then((response) => {
      if (response) {
        setLoginState(true);
      }
      else {
        history.push("/auth/login");
      }
    })
  });

  return (
    loginState ? <div className="user-dashboard-container">
      <Switch>
        <Route path="/" component={UserDashboardViews} />
      </Switch>
    </div> : <div></div>
  );
};

export default DashboardLayout;
