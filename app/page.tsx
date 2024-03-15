"use client";

import React, { useEffect, useState } from "react";
import Game from "./components/Game";

interface ApiResponse {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}

export default function Page() {
    const [deckId, setDeckId] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => response.json())
            .then((data: ApiResponse) => setDeckId(data.deck_id))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <>
            <h1>{deckId}</h1>
            <Game deckId={deckId} />
        </>
    );
}
