import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  redirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        condition ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};
export default PrivateRoute;
