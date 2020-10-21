import "./app.less";

import React, { Suspense } from "react";

const Routes = React.lazy(() => import("../routes/routes"));
import Loading from "@/components/Loading";

const App: React.FC = () => (
    <Suspense fallback={<Loading />}>
        <Routes />
    </Suspense>
);

export default App;
