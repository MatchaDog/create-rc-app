import React, { FC } from "react";
import { Route } from "react-router-dom";
import { TRoute } from "@/@types/routes";

const RouteWithSubRoutes: FC<TRoute.IRoute> = (route) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} routes={route.routes} />}
        />
    );
};

export default RouteWithSubRoutes;
