import React from "react";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import WeatherDashboard from "../../pages/WeatherDashboard";
import ProtectedRoute from "../../utils/ProtectedRoute/index";
// import { logout } from "../../services/Authentication";

function UserRoutes({ history, container }) {
  // function handleLogout() {
  //   logout();
  //   history.push("/login");
  // }

  return (
    <div>
      <CssBaseline />
      <ProtectedRoute exact path="/" component={() => <WeatherDashboard />} />
    </div>
  );
}

export default withRouter(UserRoutes);
