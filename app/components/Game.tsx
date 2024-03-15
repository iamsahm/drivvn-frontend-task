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

    function drawCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then((response) => response.json())
            .then((data) => {
                setOldCard(newCard);
                setNewCard(data.cards[0]);
            })
            .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            {/* Use the deckId prop */}
            {deckId && <p>{deckId}</p>}
            <Table leftCard={oldCard} rightCard={newCard} />
            <button onClick={drawCard}>Draw a card</button>
        </div>
    );
};

export default Game;
