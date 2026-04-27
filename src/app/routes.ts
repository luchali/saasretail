import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { LandingPage } from "../app/components/pages/LandingPage";
import { DashboardPage } from "../app/components/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: DashboardPage },
    ],
  },
]);
