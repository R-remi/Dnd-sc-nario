import { createPromptStrategy, OllamaClient } from "./chat-engine.js";
import { exportSummary } from "./export/pdfExport.js";

const history = [];
const chatDiv = document.getElementById("chat");
const promptInput = document.getElementById("prompt");
const ollama = new OllamaClient();

function updateChat() {
    chatDiv.innerHTML = history.map(item =>
        `<div class="${item.role}">${item.role === 'user' ? '👤' : '🎲'} ${item.content}</div>`
    ).join("\n");
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function sendPrompt(extraPrefix = "") {
    const rawInput = promptInput.value.trim();
    if (!rawInput) return;

    const userVisibleMessage = rawInput;
    const hiddenMessage = extraPrefix + rawInput;

    const mode = document.getElementById("mode").value;
    const strategy = createPromptStrategy(mode);

    history.push({ role: 'user', content: mode === "scenario" ? hiddenMessage : userVisibleMessage });

    const prompt = strategy.buildPrompt(history, hiddenMessage);
    promptInput.value = "";
    updateChat();

    try {
        const response = await ollama.generate(prompt);
        history.push({ role: 'assistant', content: response });
        updateChat();
    } catch (err) {
        history.push({ role: 'assistant', content: "❌ Erreur : " + err.message });
        updateChat();
        console.error(err);
    }
}

document.getElementById("sendBtn").addEventListener("click", () => sendPrompt());
promptInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendPrompt();
    }
});
document.querySelectorAll(".choice-buttons button").forEach(btn => {
    btn.addEventListener("click", () => sendPrompt(btn.dataset.choice));
});
document.getElementById("summaryButton").addEventListener("click", () => exportSummary(history, ollama));
