import React from "react";
import DashBoard_Drawer from "./components/DashBoard/DashBoard_Drawer";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store/store/store";
import SignIn from "./components/Authentication/components/SignIn";
import SignUp from "./components/Authentication/components/SignUp";
import ForgotPassword from "./components/Authentication/components/ForgotPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page404 from "./404";
import ReadMore from "./components/Read/components/ReadMore";
import Create from "./components/Create/components/Create";
function App(props) {

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact from="/" component={DashBoard_Drawer} />
            <Route path="/user/signUp" component={SignUp} />
            <Route
              path="/readMore/:_id"
              render={(props) => <ReadMore {...props} />}
            />
            <Route path="/user/signIn" component={SignIn} />
            <Route path="/user/forgotpassword" component={ForgotPassword} />

            <Route path="/user/createBlog" component={Create} />
            <Route render={(props) => <Page404 {...props} />} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
