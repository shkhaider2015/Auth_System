import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomeComp, LoginComp, SignupComp, ActivateComp,
  ResetPasswordComp, ResetPasswordConfirmComp
} from "./Containers/Containers";
import { LayoutComp } from "./HOC/Layout";

const App = () => <Router>

  <LayoutComp>
    <Switch>
        <Route exact path="/" component={HomeComp} />
        <Route exact path="/login" component={LoginComp} />
        <Route exact path="/signup" component={SignupComp} />
        <Route exact path="/activate/:uid/:token" component={ActivateComp} />
        <Route exact path="/reset-password" component={ResetPasswordComp} />
        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirmComp} />
    </Switch>
  </LayoutComp>
</Router>

export default App;
