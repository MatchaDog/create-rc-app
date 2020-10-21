import "./index.less";

import React, { FC } from "react";

const Loading: FC = () => {
    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
            <div className="folding-cube">
                <div className="cube1 cube"></div>
                <div className="cube2 cube"></div>
                <div className="cube4 cube"></div>
                <div className="cube3 cube"></div>
            </div>
        </div>
    );
};

export default Loading;
