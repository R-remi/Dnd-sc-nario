# Ollama Chat Web Interface

Une interface web simple pour discuter avec un modèle LLaMA 3 local grâce à [Ollama](https://ollama.com/).

---

##  Prérequis

- [Ollama](https://ollama.com/) installé et configuré
- Modèle `llama3` téléchargé localement
- Python installé (pour lancer un serveur web local)

---

##  Installation

### 1. Installer Ollama

#### Windows :
1. Télécharger Ollama depuis la [page officielle](https://ollama.com/download).
2. Lancer l'exécutable téléchargé (environ 212 Mo).
3. Suivre l'assistant d'installation.
4. Une fois installé, Ollama démarre automatiquement en arrière-plan (port `11434`).
5. Vérifier que le serveur tourne : accédez à [http://localhost:11434](http://localhost:11434) dans votre navigateur.

#### Linux / macOS :
Voir les instructions sur la [page de téléchargement](https://ollama.com/download).

---

### 2. Télécharger et lancer le modèle `llama3`

Dans un terminal, exécute la commande suivante :

```bash
ollama run llama3
```
Cela téléchargera (si nécessaire) le modèle llama3 et le démarrera automatiquement.
Le serveur local sera accessible à l’adresse : http://localhost:11434.
3. Lancer l'interface web

Place le fichier index.html dans un dossier (ex. ollama-chat).

Ouvre un terminal dans ce dossier.

Lance un serveur web local avec Python :

    python3 -m http.server

Ouvre ton navigateur à l'adresse suivante :

    http://localhost:8000

Tu peux maintenant poser des questions au modèle depuis l'interface web.

 Arborescence du projet

/ollama-chat/
├── index.html      # Page web avec champ texte et réponse du modèle
└── README.md       # Ce fichier

 Problèmes connus

CORS : Si tu ouvres index.html directement (file://), les requêtes seront bloquées pour des raisons de sécurité.
→ Utilise impérativement python3 -m http.server.

Port utilisé : Le port 11434 doit être libre et ne pas être bloqué par un pare-feu.

Modèle non lancé : Assure-toi que ollama run llama3 est en cours avant d’ouvrir la page web.

 Exemple de fonctionnement

Entrer une question dans le champ texte, par exemple :

    Pourquoi le ciel est-il bleu ?

Cliquer sur Envoyer

Le modèle LLaMA 3 répond directement sous le champ texte.

 Licence

Projet Rémi + Noé — utilise Ollama et les modèles open-source comme LLaMA 3.
