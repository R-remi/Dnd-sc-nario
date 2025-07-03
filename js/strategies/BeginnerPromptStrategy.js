import { PromptStrategy } from "./PromptStrategy.js";

export class BeginnerPromptStrategy extends PromptStrategy {
    buildPrompt(_, userInput) {
        return `Tu es un maître du jeu Donjons & Dragons. Tu parles français. Écris une scène complète avec :
- Description du lieu
- Personnages présents
- Réactions à l’arrivée du joueur
- Dialogues naturels
- Enchaînement des événements

Utilise un style narratif riche.

Situation de départ : ${userInput}`;
    }
}
