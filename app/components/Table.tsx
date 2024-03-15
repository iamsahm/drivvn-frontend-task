"use client";

import React from "react";
import { Card } from "./card";

interface TableProps {
    leftCard: Card;
    rightCard: Card;
}

const Table: React.FC<TableProps> = ({ leftCard, rightCard }) => {
    return (
        <div>
            <img
                src={leftCard.image}
                alt={`${leftCard.value} of ${leftCard.suit}`}
            />
            <img
                src={rightCard.image}
                alt={`${rightCard.value} of ${rightCard.suit}`}
            />
        </div>
    );
};

export default Table;
