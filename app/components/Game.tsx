"use client";

import React, { useState } from "react";
import { Card } from "./card";
import SnapStatus from "./SnapStatus";
import Table from "./Table";
import ProbabilityStatus from "./ProbabilityStatus";
import styled from "styled-components";
import "./Game.css";

interface GameProps {
    deckId: string | null;
}

const placeHolderCard = {
    code: "0",
    value: "0",
    suit: "0",
    image: "https://deckofcardsapi.com/static/img/back.png",
    images: {
        svg: "https://deckofcardsapi.com/static/img/back.svg",
        png: "https://deckofcardsapi.com/static/img/back.png",
    },
};

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    p {
        font-size: 20px;
        font-weight: bold;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    button {
        font-size: 20px;
        font-weight: bold;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        padding: 10px 20px;
        margin: 0 auto;
        border-radius: 5px;
        background-color: #008cff;
        color: white;
        border: none;
        cursor: pointer;
    }
`;

const ButtonAndResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 30em;
`;

const Game: React.FC<GameProps> = ({ deckId }) => {
    const [newCard, setNewCard] = useState<Card>(placeHolderCard);
    const [oldCard, setOldCard] = useState<Card>(placeHolderCard);
    const [snapValue, setSnapValue] = useState<boolean>(false);
    const [snapSuit, setSnapSuit] = useState<boolean>(false);
    const [valueSnapCount, setValueSnapCount] = useState<number>(0);
    const [suitSnapCount, setSuitSnapCount] = useState<number>(0);
    const [cardsDrawn, setCardsDrawn] = useState<Card[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    async function drawCard(): Promise<void> {
        setIsFetching(true);
        try {
            const response = await fetch(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            const data = await response.json();
            if (data.success) {
                const nextCard = data.cards[0];
                setCardsDrawn((cardsDrawn) => [...cardsDrawn, nextCard]);
                setGameOver(cardsDrawn.length + 1 === 52);
                setOldCard(newCard);
                setNewCard(gameOver ? placeHolderCard : nextCard);
                setSnapValue(isSnapValue(newCard, nextCard));
                setSnapSuit(isSnapSuit(newCard, nextCard));
            } else {
                throw new Error(
                    "There's been an error, please refresh the page and try again."
                );
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsFetching(false);
        }
    }

    function isSnapValue(card1: Card, card2: Card): boolean {
        if (card1.value === card2.value) {
            setValueSnapCount(valueSnapCount + 1);
        }
        return card1.value === card2.value;
    }

    function isSnapSuit(card1: Card, card2: Card): boolean {
        if (card1.suit === card2.suit) {
            setSuitSnapCount(suitSnapCount + 1);
        }
        return card1.suit === card2.suit;
    }

    return (
        <GameContainer data-testid="game" className="game">
            <SnapStatus snapValue={snapValue} snapSuit={snapSuit} />
            <Table leftCard={oldCard} rightCard={newCard} />

            <ButtonAndResultsContainer>
                {!gameOver ? (
                    <button
                        data-testid="drawButton"
                        onClick={drawCard}
                        disabled={isFetching}
                    >
                        Draw card
                    </button>
                ) : (
                    <>
                        <p>VALUE MATCHES: {valueSnapCount}</p>
                        <p>SUIT MATCHES: {suitSnapCount}</p>
                    </>
                )}
                <p>Cards remaining: {52 - cardsDrawn.length}</p>
                <ProbabilityStatus cardsDrawn={cardsDrawn} />
            </ButtonAndResultsContainer>
        </GameContainer>
    );
};

export default Game;
