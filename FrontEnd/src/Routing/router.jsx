import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import { connect } from "react-redux";

const Router = ({ isAuthenticated }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/auth/:type" component={AuthPage} />
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
