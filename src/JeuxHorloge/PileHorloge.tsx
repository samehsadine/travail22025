// PileHorloge.tsx
/* import React from "react";
import { CarteH } from "./Types";

interface PileHorlogeProps {
  pile: CarteH[];
  indexPile: number;
  deplacerCarte: (carte: CarteH, indexPile: number) => void;
  centrale: boolean;
}

const PileHorloge: React.FC<PileHorlogeProps> = ({ pile, indexPile, deplacerCarte, centrale }) => {
  return (
    <div
      className={`pile ${centrale ? "pile-centrale" : ""}`}
      onClick={() => pile.length > 0 && deplacerCarte(pile[0], indexPile)}
    >
      {pile.map((carte, idx) => (
        <div key={idx} className="carte">
          <img src={carte.image} alt={carte.code} />
        </div>
      ))}
    </div>
  );
};

export default PileHorloge; */
import React from "react";
import { CarteH } from "./Types";
import Carte1 from "./Carte1";
interface PileHorlogeProps {
  pile: CarteH[];
  indexPile: number;
  deplacerCarte: (carte: CarteH, indexPile: number) => void;
  centrale: boolean;
}

const PileHorloge: React.FC<PileHorlogeProps> = ({ pile, indexPile, deplacerCarte, centrale }) => {
  console.log('pile',pile)
  return (
    <div className="pile">
      {pile.length > 0 && (
        // <img
        //   src={pile[pile.length - 1].image}
        //   alt="Carte"
        //   style={{ width: "50px", height: "70px" }}
        // />
        <Carte1 carte={pile[pile.length - 1]} />
      )}
    </div>
  );
};

export default PileHorloge;

