import React from "react";
import { CarteH } from "./Types";

interface CarteProps {
  carte: CarteH;
}

export default function Carte1({ carte }: CarteProps) {
  return (
    <div className="carte">
      <img src={`https://deckofcardsapi.com/static/img/${carte.code}.png`} alt={carte.code} />
    </div>
  );
}
