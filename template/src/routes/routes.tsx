import React, { lazy, FC, useMemo } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import RouteWithSubRoutes from "./RouteWithSubRoutes";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Routes: FC = () => {
    const routeList = useMemo(
        () => [
            {
                path: "/",
                key: "home",
                exact: true,
                component: Home,
            },
            {
                path: "*",
                key: "404",
                component: NotFound,
            },
        ],
        [],
    );
    return (
        <Router>
            <Switch>
                {routeList.map((route) => {
                    return <RouteWithSubRoutes key={route.key} {...route} />;
                })}
            </Switch>
        </Router>
    );
};

export default Routes;
