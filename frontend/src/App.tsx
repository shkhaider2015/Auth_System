import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomeComp, LoginComp, SignupComp, ActivateComp,
  ResetPasswordComp, ResetPasswordConfirmComp,
  GoogleComp, FacebookComp
} from "./Containers/Containers";
import LayoutComp from "./HOC/Layout";
import { Provider } from "react-redux";
import { store } from "./State/Store";

const App = () => <Provider store={store} >

  <Router>
    <LayoutComp>
      <Switch>
        <Route exact path="/" component={HomeComp} />
        <Route exact path="/login" component={LoginComp} />
        <Route exact path="/signup" component={SignupComp} />
        <Route exact path="/facebook" component={FacebookComp} />
        <Route exact path="/google" component={GoogleComp} />
        <Route exact path="/activate/:uid/:token" component={ActivateComp} />
        <Route exact path="/reset-password" component={ResetPasswordComp} />
        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirmComp} />
      </Switch>
    </LayoutComp>
  </Router>
</Provider>

export default App;
