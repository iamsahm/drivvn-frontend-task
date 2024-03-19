"use client";

import React from "react";
import styled from "styled-components";

interface SnapStatusProps {
    snapValue: boolean;
    snapSuit: boolean;
}

const SnapStatusContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 10em;
`;

const snapValueReturnString: string = "SNAP VALUE!";
const snapSuitReturnString: string = "SNAP SUIT!";

const SnapStatus: React.FC<SnapStatusProps> = ({ snapValue, snapSuit }) => (
    <SnapStatusContainer data-testid="snapStatus">
        {snapSuit ? <p>{snapSuitReturnString}</p> : null}
        {snapValue ? <p>{snapValueReturnString}</p> : null}
    </SnapStatusContainer>
);

export default SnapStatus;
