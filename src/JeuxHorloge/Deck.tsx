export interface Cartes {
    valeur: string;
    couleur: string;
  }
  
  export const Deck = {
    async creerPaquet(): Promise<string[]> {
      try {
        // Crée un nouveau paquet et récupère l'ID du paquet
        const reponse = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const donnees = await reponse.json();
  
        // Vérifie que la réponse contient un deck_id valide
        if (donnees.success && donnees.deck_id) {
          // Utilise le deck_id pour tirer les cartes
          const paquet = await this.tirerCartes(donnees.deck_id);
          return paquet;
        } else {
          throw new Error("Erreur lors de la création du paquet.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du paquet :", error);
        return []; // Retourne un tableau vide en cas d'erreur
      }
    },
  
    async tirerCartes(deck_id: string): Promise<string[]> {
      try {
        // Tire 52 cartes du paquet créé
        const reponse = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
        );
        const donnees = await reponse.json();

        console.log('Donnees',donnees)
  
        // Vérifie si les cartes sont présentes dans la réponse
        if (donnees.cards) {
          // Récupère les codes des cartes
          return donnees.cards.map((carte: any) => carte.code);
        } else {
          throw new Error("Erreur lors de la récupération des cartes.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
        return []; // Retourne un tableau vide en cas d'erreur
      }
    },
  };
  
  