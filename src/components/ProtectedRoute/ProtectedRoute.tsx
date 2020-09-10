import React, { FunctionComponent } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { ROUTES_URLS } from "../App";
interface ProtectedRouteProps extends RouteProps {
  isAuthenticated?: boolean;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  isAuthenticated,
  render,
  ...rest
}: ProtectedRouteProps) => {
  console.log(">>", rest);
  return (
    <Route
      {...rest}
      render={(routeCompProps: RouteComponentProps) =>
        isAuthenticated ? (
          render!({ ...routeCompProps, ...rest })
        ) : (
          <Redirect
            to={{
              pathname: ROUTES_URLS.LOGIN,
              state: { from: routeCompProps.location },
            }}
          />
        )
      }
    />
  );
};

export { ProtectedRoute };
