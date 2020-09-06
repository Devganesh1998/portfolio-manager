import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";
// import ProtectedRoute from "./ProtectedRoute";
import { connect } from "react-redux";
import SideMenu from "./SideMenu" 

const Router = ({ isAuthenticated }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/auth/:type" component={AuthPage} />
        <Route path="/" component={SideMenu} />
        <Route render={() => <h3>404 Not Found</h3>} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Router);
