"use client";

import React from "react";
import { Card } from "./card";
import styled from "styled-components";

interface ProbabilityStatusProps {
    cardsDrawn: Card[];
}

const ProbabilityStatusContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;

    @media (max-width: 500px) {
        flex-direction: column;
        img {
            margin: 10px 0;
        }
    }
`;

const ProbabilityStatus: React.FC<ProbabilityStatusProps> = ({
    cardsDrawn,
}) => {
    return (
        <ProbabilityStatusContainer data-testid="probabilityStatus">
            <p data-testid="snapValueProbability">
                Probability of a snap value: 1 in 51
            </p>
        </ProbabilityStatusContainer>
    );
};

export default ProbabilityStatus;
