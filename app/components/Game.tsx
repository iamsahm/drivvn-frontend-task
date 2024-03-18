"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./card";
import Table from "./Table";
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

const SnapStatusContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 10em;
`;

const ButtonAndResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 10em;
`;

const Game: React.FC<GameProps> = ({ deckId }) => {
    const [newCard, setNewCard] = useState<Card>(placeHolderCard);
    const [oldCard, setOldCard] = useState<Card>(placeHolderCard);
    const [snapValue, setSnapValue] = useState<boolean>(false);
    const [snapSuit, setSnapSuit] = useState<boolean>(false);
    const [valueSnapCount, setValueSnapCount] = useState<number>(0);
    const [suitSnapCount, setSuitSnapCount] = useState<number>(0);
    const [cardsDrawn, setCardsDrawn] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    async function drawCard(): Promise<void> {
        try {
            const response = await fetch(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            const data = await response.json();
            if (data.success) {
                const newCardsDrawn = cardsDrawn + 1;
                setCardsDrawn(newCardsDrawn);
                setGameOver(newCardsDrawn === 52);
            }
            const nextCard = data.cards[0];
            setOldCard(newCard);
            setNewCard(gameOver ? placeHolderCard : nextCard);
            setSnapValue(isSnapValue(newCard, nextCard));
            setSnapSuit(isSnapSuit(newCard, nextCard));
        } catch (error) {
            console.error("Error:", error);
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
            <SnapStatusContainer
                data-testid="snapStatus"
                className="snapStatus"
            >
                {snapValue && <p>SNAP VALUE!</p>}
                {snapSuit && <p>SNAP SUIT!</p>}
            </SnapStatusContainer>
            <Table leftCard={oldCard} rightCard={newCard} />

            <ButtonAndResultsContainer>
                {!gameOver ? (
                    <button data-testid="drawButton" onClick={drawCard}>
                        Draw card
                    </button>
                ) : (
                    <>
                        <p>VALUE MATCHES: {valueSnapCount}</p>
                        <p>SUIT MATCHES: {suitSnapCount}</p>
                    </>
                )}
            </ButtonAndResultsContainer>
        </GameContainer>
    );
};

export default Game;
