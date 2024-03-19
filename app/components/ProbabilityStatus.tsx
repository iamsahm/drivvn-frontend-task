"use client";

import React from "react";
import { Card } from "./card";
import styled from "styled-components";

interface ProbabilityStatusProps {
    cardsDrawn: Card[];
}

const ProbabilityStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
`;

const calculateSnapSuitProbability = (
    cardsDrawn: Card[],
    currentCard: Card
) => {
    const nonPotentialSuitMatches = cardsDrawn.filter(
        (card) => card.suit === currentCard.suit
    );
    return 13 - nonPotentialSuitMatches.length;
};

const calculateSnapValueProbability = (
    cardsDrawn: Card[],
    currentCard: Card
) => {
    const nonPotentialValueMatches = cardsDrawn.filter(
        (card) => card.value === currentCard.value
    );
    return 4 - nonPotentialValueMatches.length;
};

const ProbabilityStatus: React.FC<ProbabilityStatusProps> = ({
    cardsDrawn,
}) => {
    if (cardsDrawn.length === 0) {
        return (
            <ProbabilityStatusContainer data-testid="probabilityStatus">
                <p>
                    Draw a card to see the probability the next card is a snap
                </p>
            </ProbabilityStatusContainer>
        );
    }
    const currentCard = cardsDrawn[cardsDrawn.length - 1];
    const remainingCards = 52 - cardsDrawn.length;

    const snapSuitProbability = calculateSnapSuitProbability(
        cardsDrawn,
        currentCard
    );
    const snapValueProbability = calculateSnapValueProbability(
        cardsDrawn,
        currentCard
    );

    return (
        <ProbabilityStatusContainer data-testid="probabilityStatus">
            <p data-testid="snapValueProbability">
                Probability of a snap value: {snapValueProbability} in{" "}
                {remainingCards}
            </p>
            <p data-testid="suitProbability">
                Probability of a snap suit: {snapSuitProbability} in{" "}
                {remainingCards}
            </p>
        </ProbabilityStatusContainer>
    );
};

export default ProbabilityStatus;

export type { ProbabilityStatusProps };
