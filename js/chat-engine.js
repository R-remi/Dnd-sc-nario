import { BeginnerPromptStrategy } from "./strategies/BeginnerPromptStrategy.js";
import { ScenarioPromptStrategy } from "./strategies/ScenarioPromptStrategy.js";

export function createPromptStrategy(type) {
    if (type === "beginner") return new BeginnerPromptStrategy();
    if (type === "scenario") return new ScenarioPromptStrategy();
    throw new Error("Type inconnu");
}

export class OllamaClient {
    constructor(model = "llama3") {
        this.model = model;
    }

    async generate(promptText) {
        const res = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: this.model, prompt: promptText, stream: false })
        });
        if (!res.ok) throw new Error("Erreur réseau : " + res.status);
        const data = await res.json();
        return data.response;
    }
}
