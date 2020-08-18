import * as React from "react";
import { LogIn } from "../LogIn/LogIn.tsx";
import { DashBoard } from "../DashBoard/DashBoard.tsx";

export const routes = [
  {
    path: "/",
    exact: true,
    component: LogIn,
    title: "login",
  },
  {
    path: "/dashboard",
    component: DashBoard,
    title: "dashBoard",
  },
];
