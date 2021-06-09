import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./features/Auth";
import Dashboard from "./features/Dashboard";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthUser); // su dung de check token

  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   if (isAuth) {
  //     setTimeout(() => {
  //       dispatch(signOut());
  //       localStorage.removeItem("token");
  //       window.location.href = "/";
  //     }, 300000);
  //   }
  // });

  React.useEffect(() => {}, [isAuth]);

  return (
    <Suspense fallback={<div> Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/login" component={Auth} />
          <PrivateRoute
            path="/home"
            condition={isAuth}
            redirect="/login"
            component={Dashboard}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
