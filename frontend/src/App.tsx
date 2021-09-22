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

    </Switch>
  </LayoutComp>
</Router>

export default App;
