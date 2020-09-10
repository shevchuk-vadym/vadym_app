import * as React from "react";
import { LogIn } from "../LogIn/LogIn";
import { DashBoard } from "../DashBoard/DashBoard";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";
import { OAuth } from "../OAuth/OAuth";
import { User } from "../User/user";

export interface AppRoute {
  path?: string;
  render: (props: any) => any;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
  isProtected?: boolean;
}

export enum ROUTES_URLS {
  HOME = "/",
  LOGIN = "/signin",
  DASHBOARD = "/dashboard",
  OAUTH = "/oauth",
  NOT_FOUND = "/404",
  USER_PROFILE = "/profile",
}

export const routes: Array<AppRoute> = [
  {
    path: ROUTES_URLS.LOGIN,
    render: (props: any) => <LogIn {...props} />,
    title: "login",
  },
  {
    path: ROUTES_URLS.DASHBOARD,
    title: "Dash board",
    isProtected: true,
    render: (props: any) => <DashBoard {...props} />,
  },
  {
    path: ROUTES_URLS.HOME,
    exact: true,
    isHidden: true,
    render: () => <Redirect to={ROUTES_URLS.LOGIN} />,
  },
  {
    path: ROUTES_URLS.NOT_FOUND,
    isHidden: true,
    render: (props: any) => <NotFound {...props} />,
  },
  {
    path: ROUTES_URLS.USER_PROFILE,
    exact: true,
    isHidden: true,
    isProtected: true,
    render: (props: any) => <User {...props} />,
  },
];
