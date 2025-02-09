/* import React, { useEffect, useState } from "react";
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { EtatApp, CarteH } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

const Horloge: React.FC = () => {
  const [etat, setEtat] = useState<EtatApp>({
    piles: Array(12).fill({ cartes: [] }),
    pileCentrale: { cartes: [] },
    paquet: [],
    cartesRevelees: [],
  });

  // Utilisation de useEffect pour récupérer les cartes via l'API
  useEffect(() => {
    const initialiserJeu = async () => {
      const nouveauPaquet = await Deck.creerPaquet();
      setEtat((ancienEtat) => ({ ...ancienEtat, paquet: nouveauPaquet }));
      distribuerCartes(nouveauPaquet);
    };

    initialiserJeu();
  }, []); // Vide le tableau de dépendances pour que cela se fasse une seule fois au démarrage

  const distribuerCartes = (paquet: string[]) => {
    const piles: { cartes: CarteH[] }[] = Array(12).fill({ cartes: [] }).map(() => ({ cartes: [] }));
    
    const pileCentrale: { cartes: CarteH[] } = {
      cartes: [
        { code: paquet[0], image: `https://deckofcardsapi.com/static/img/${paquet[0]}.png` },
      ],
    };
  
    for (let i = 1; i < paquet.length; i++) {
      const indexPile = i % 12;
      piles[indexPile].cartes.push({
        code: paquet[i],
        image: `https://deckofcardsapi.com/static/img/${paquet[i]}.png`,
      });
    }
  
    setEtat((ancienEtat) => ({
      ...ancienEtat,
      piles,
      pileCentrale,  // Correcte maintenant la structure de pileCentrale
    }));
  };
  

  function deplacerCarte(carte: CarteH, indexPile: number) {
    const nouvellesPilesCopy = [...etat.piles]; // Crée une copie de l'état des piles

    // Vérifie que l'élément à l'index spécifié est un tableau avant de l'itérer
    if (Array.isArray(nouvellesPilesCopy[indexPile].cartes)) {
      nouvellesPilesCopy[indexPile].cartes = [
        ...nouvellesPilesCopy[indexPile].cartes,
        carte,
      ]; // Ajoute la carte à la pile
    } else {
      console.error("L'élément à l'index " + indexPile + " n'est pas un tableau.");
    }

    // Met à jour l'état avec les nouvelles piles
    setEtat((ancienEtat) => ({ ...ancienEtat, piles: nouvellesPilesCopy }));
  }

  return (
    <div className="container text-center mt-5">
      <h1>Clock Solitaire</h1>
      <div className="row justify-content-center mt-4">
        {etat.piles.map((pile, index) => (
          <div className="col-2" key={index}>
            <PileHorloge
              pile={pile.cartes} // Passe des objets CarteH ici
              indexPile={index}
              deplacerCarte={deplacerCarte}
              centrale={false}
            />
          </div>
        ))}
        <div className="col-2">
          <PileHorloge
            pile={etat.pileCentrale.cartes} // Passe des objets CarteH ici
            indexPile={-1}
            deplacerCarte={deplacerCarte}
            centrale={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Horloge;
 */
import React, { useState, useEffect } from "react";
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { EtatApp, CarteH, Pile } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

const Horloge: React.FC = () => {
  const [etat, setEtat] = useState<EtatApp>({
    piles: Array(12).fill(null).map(() => ({ cartes: [] as CarteH[] })), // 12 piles vides
    pileCentrale: { cartes: [] as CarteH[] }, // Pile centrale vide
    paquet: [], // Paquet vide
    cartesRevelees: [], // Aucune carte révélée au départ
  });

  useEffect(() => {
    const initialiserJeu = async () => {
      const nouveauPaquet = await Deck.creerPaquet();
      setEtat((ancienEtat) => ({ ...ancienEtat, paquet: nouveauPaquet }));
      distribuerCartes(nouveauPaquet);
    };

    initialiserJeu();
  }, []);

  const distribuerCartes = (paquet: string[]) => {
    const piles = Array(12).fill(null).map(() => ({ cartes: [] as CarteH[] }));
    const pileCentrale = { cartes: [] as CarteH[] };

    let indexCarte = 0;

    // Mélanger le paquet pour distribuer les cartes de manière aléatoire
    paquet.sort(() => Math.random() - 0.5);

    // Distribution des 12 piles en cercle (4 cartes par pile, face cachée)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 12; j++) {
        piles[j].cartes.push({
          code: paquet[indexCarte],
          image: `https://deckofcardsapi.com/static/img/${paquet[indexCarte]}.png`,
          faceVisible: false, // Toutes les cartes commencent face cachée
        });
        indexCarte++;
      }
    }

    // Distribution de la pile centrale (4 cartes, face cachée)
    for (let i = 0; i < 4; i++) {
      pileCentrale.cartes.push({
        code: paquet[indexCarte],
        image: `https://deckofcardsapi.com/static/img/${paquet[indexCarte]}.png`,
        faceVisible: true, // Toutes les cartes commencent face cachée
      });
      indexCarte++;
    }

    // Choisir une carte au hasard parmi les 4 premières cartes de la pile centrale pour la rendre visible
    const indexCarteVisible = Math.floor(Math.random() * 4);
    pileCentrale.cartes[indexCarteVisible].faceVisible = true;

    // Mettre à jour l'état avec les nouvelles piles, la pile centrale et la carte révélée
    setEtat((ancienEtat) => ({
      ...ancienEtat,
      piles,
      pileCentrale,
      cartesRevelees: [pileCentrale.cartes[indexCarteVisible]], // Ajouter la carte révélée
    }));
  };

  // Fonction pour déplacer une carte dans la pile correspondante
  const deplacerCarte = (carte: CarteH, indexPile: number) => {
    const nouvellesPiles = [...etat.piles];

    // Vérifier si la carte peut être déplacée (par exemple, si elle est face visible)
    if (!carte.faceVisible) {
      alert("Vous ne pouvez pas déplacer une carte face cachée !");
      return;
    }

    // Ajouter la carte à la pile correspondante et la rendre face visible
    nouvellesPiles[indexPile].cartes.push({ ...carte, faceVisible: true });

    // Mettre à jour l'état avec les nouvelles piles et la carte révélée
    setEtat((ancienEtat) => ({
      ...ancienEtat,
      piles: nouvellesPiles,
      cartesRevelees: [...ancienEtat.cartesRevelees, carte], // Ajouter la carte aux cartes révélées
    }));
  };

  // Fonction pour obtenir l'index de la pile correspondant à une carte
  const obtenirPileCorrespondante = (carte: CarteH) => {
    const valeurCarte = carte.code.split("_")[0]; // Extrait la valeur de la carte (par exemple "2", "JACK", etc.)
    const rangs: { [key: string]: number } = {
      "2": 1,
      "3": 2,
      "4": 3,
      "5": 4,
      "6": 5,
      "7": 6,
      "8": 7,
      "9": 8,
      "10": 9,
      "JACK": 10,
      "QUEEN": 11,
      "KING": 12,
      "ACE": 0,
    };
    return rangs[valeurCarte] ?? -1; // Retourne l'index de la pile correspondant au rang
  };

  return (
    <div className="container text-center mt-5">
      <h1>Clock Solitaire</h1>
      <div
        className="position-relative"
        style={{ width: "500px", height: "500px", margin: "0 auto" }}
      >
        {etat.piles.map((pile, index) => {
          const angle = (index * 30) * (Math.PI / 180);
          const radius = 180;
          const x = 250 + radius * Math.cos(angle);
          const y = 250 + radius * Math.sin(angle);
          return (
            <div
              key={index}
              className="position-absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PileHorloge
                pile={pile.cartes}
                indexPile={index}
                deplacerCarte={deplacerCarte}
                centrale={false}
              />
            </div>
          );
        })}
        <div className="position-absolute top-50 start-50 translate-middle">
          <PileHorloge
            pile={etat.pileCentrale.cartes}
            indexPile={-1}
            deplacerCarte={deplacerCarte}
            centrale={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Horloge;