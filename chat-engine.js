// Strategy interface
class PromptStrategy {
    buildPrompt(history, userInput) {
        throw new Error("Méthode non implémentée");
    }
}

// Débutant : scène unique
class BeginnerPromptStrategy extends PromptStrategy {
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

// Avancé : avec historique
class ScenarioPromptStrategy extends PromptStrategy {
    buildPrompt(history, _) {
        const base = `Tu es un maître du jeu Château & Créatures fantastiques. Tu parles français. Génére des scènes riches et crédibles sans questions ouvertes.`;

        const historique = history.map(h =>
            (h.role === 'user' ? "Joueur : " : "MJ : ") + h.content
        ).join("\n");

        return `${base}\n\nHistorique de la partie :\n${historique}\n\nContinue l’histoire :`;
    }
}

// Factory
function createPromptStrategy(type) {
    if (type === "beginner") return new BeginnerPromptStrategy();
    if (type === "scenario") return new ScenarioPromptStrategy();
    throw new Error("Type inconnu");
}

// Facade : client API
class OllamaClient {
    constructor(model = "llama3") {
        this.model = model;
    }

    async generate(promptText) {
        const res = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: this.model,
                prompt: promptText,
                stream: false
            })
        });

        if (!res.ok) {
            throw new Error("Erreur réseau : " + res.status);
        }

        const data = await res.json();
        return data.response;
    }
}
