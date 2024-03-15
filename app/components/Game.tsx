"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./card";
import Table from "./Table";

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

const Game: React.FC<GameProps> = ({ deckId }) => {
    const [newCard, setNewCard] = useState<Card>(placeHolderCard);
    const [oldCard, setOldCard] = useState<Card>(placeHolderCard);
    const [snapValue, setSnapValue] = useState<boolean>(false);
    const [snapSuit, setSnapSuit] = useState<boolean>(false);

    async function drawCard() {
        try {
            const response = await fetch(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            const data = await response.json();
            const nextCard = data.cards[0];
            setOldCard(newCard);
            setNewCard(nextCard);
            setSnapValue(isSnapValue(newCard, nextCard));
            setSnapSuit(isSnapSuit(newCard, nextCard));
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function isSnapValue(card1: Card, card2: Card): boolean {
        return card1.value === card2.value;
    }

    function isSnapSuit(card1: Card, card2: Card): boolean {
        return card1.suit === card2.suit;
    }

    return (
        <div data-testid="game">
            <Table leftCard={oldCard} rightCard={newCard} />
            {snapValue && <p>Snap Value!</p>}
            {snapSuit && <p>Snap Suit!</p>}
            <button data-testid="drawButton" onClick={drawCard}>
                Draw a card
            </button>
        </div>
    );
};

export default Game;
