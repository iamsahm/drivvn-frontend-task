"use client";

import React from "react";
import { Card } from "./card";
import styled from "styled-components";

interface TableProps {
    leftCard: Card;
    rightCard: Card;
}

const TableContainer = styled.div`
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

const Table: React.FC<TableProps> = ({ leftCard, rightCard }) => {
    return (
        <TableContainer data-testid="table">
            <img
                src={leftCard.image}
                alt={`${leftCard.value} of ${leftCard.suit}`}
            />
            <img
                src={rightCard.image}
                alt={`${rightCard.value} of ${rightCard.suit}`}
            />
        </TableContainer>
    );
};

export default Table;
