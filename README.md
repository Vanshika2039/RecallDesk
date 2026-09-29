# RecallDesk 🧠

### AI Customer Support Agent with Persistent Memory

RecallDesk is an AI-powered customer support agent that uses **Hindsight** as a persistent memory layer to remember relevant information from previous customer interactions and use that context to provide more personalized support.

Unlike a conventional chatbot that treats each conversation as a fresh interaction, RecallDesk can retain customer information such as previous issues, environment, subscription details, and solutions discussed earlier.

---

## 🚀 The Problem

Traditional AI customer support agents often lose context between interactions.

A customer may have already explained:

* Their subscription plan
* Their operating environment
* A previous technical issue
* Steps they have already tried
* Solutions discussed in earlier conversations

When the customer returns, they may have to explain the same information again.

This creates repetitive conversations and a less personalized support experience.

---

## 💡 Our Solution

RecallDesk gives the support agent **persistent memory**.

The agent can:

1. Receive a customer's current message.
2. Retrieve relevant information from previous interactions using Hindsight.
3. Provide the retrieved context to the LLM.
4. Generate a personalized support response.
5. Store the current interaction back into Hindsight for future conversations.

This creates a continuous learning loop where previous interactions can improve future support.

---

## 🧠 Why Hindsight?

Hindsight is the core memory technology behind RecallDesk.

Instead of relying only on the current conversation, RecallDesk uses Hindsight to:

* Retain customer interactions.
* Recall relevant historical information.
* Provide previous context to the AI agent.
* Build continuity across customer interactions.

### Example

During an earlier interaction, Sarah tells the support agent:

> "I use the Pro plan on Windows and I'm having a checkout timeout problem."

Later, Sarah says:

> "I'm having trouble with checkout again."

RecallDesk can retrieve the relevant previous context and respond with awareness that Sarah uses the **Pro plan on Windows** and previously experienced a **checkout timeout issue**.

The customer does not need to repeat the same information.

---

## 🏗️ System Architecture

```text
┌──────────────────────┐
│      Customer        │
│    Sarah Johnson     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   RecallDesk UI      │
│ HTML / CSS / JS      │
└──────────┬───────────┘
           │
           │ POST /chat
           ▼
┌──────────────────────┐
│    Flask Backend     │
│      Python          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Hindsight Recall   │
│  Retrieve relevant   │
│   customer memory    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Groq LLM        │
│   Response Generation│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Personalized Support │
│      Response        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Hindsight Retain   │
│ Store current context│
└──────────────────────┘
```

---

## ✨ Key Features

### 🧠 Persistent Customer Memory

RecallDesk retains information from previous customer interactions and makes relevant information available during future conversations.

### 🔎 Context-Aware Recall

The system retrieves memories relevant to the customer's current message rather than simply displaying the entire conversation history.

### 💬 Personalized Support

The LLM uses recalled information to generate responses that are specific to the customer's previous context.

### 👤 Customer Profile

The interface displays a customer profile containing information such as:

* Customer name
* Customer ID
* Subscription plan
* Environment
* Account status

### 📋 Memory Retrieved Panel

The interface includes a dedicated memory panel that allows users to see the information retrieved for the current interaction.

This makes the agent's memory behavior visible during the demonstration.

---

## 🔄 How RecallDesk Works

### 1. Customer Interaction

The customer sends a support message through the RecallDesk interface.

### 2. Memory Retention

The interaction is sent to Hindsight and retained as customer context.

### 3. Memory Recall

The customer's current message is used to retrieve relevant memories from Hindsight.

### 4. LLM Processing

The recalled information and the current customer message are provided to the LLM.

### 5. Personalized Response

The LLM generates a concise customer-support response using the relevant context.

### 6. Continuous Memory

The current interaction becomes available as memory for future conversations.

---

## 🛠️ Technology Stack

| Component              | Technology            |
| ---------------------- | --------------------- |
| Frontend               | HTML, CSS, JavaScript |
| Backend                | Python, Flask         |
| Memory                 | Hindsight             |
| LLM                    | Groq                  |
| API Communication      | REST API              |
| Cross-Origin Support   | Flask-CORS            |
| Environment Management | python-dotenv         |

---

## 📁 Project Structure

```text
RecallDesk/
│
├── backend/
│   ├── app.py
│   ├── hindsight_service.py
│   ├── llm_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

Make sure you have:

* Python 3.x
* Git
* A Hindsight API account/API key
* A Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/Vanshika2039/RecallDesk.git
cd RecallDesk
```

### 2. Create a Virtual Environment

```bash
cd backend
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
HINDSIGHT_API_URL=your_hindsight_api_url
HINDSIGHT_API_KEY=your_hindsight_api_key
GROQ_API_KEY=your_groq_api_key
```

**Never commit your `.env` file or API keys to GitHub.**

### 5. Start the Backend

From the `backend` directory:

```bash
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5001
```

### 6. Run the Frontend

Open the `frontend/index.html` file using a local development server such as VS Code Live Server.

The frontend communicates with:

```text
http://127.0.0.1:5001/chat
```

---

## 🧪 Demo Scenario

The main demonstration uses a customer named **Sarah Johnson**.

### First Interaction

Sarah provides information about her account and issue:

```text
I use the Pro plan on Windows and I'm having a checkout timeout problem.
```

The interaction is retained in Hindsight.

### Later Interaction

Sarah returns and says:

```text
I'm having trouble with checkout again.
```

RecallDesk retrieves relevant information from the previous interaction.

The agent can then use that context to provide a more personalized response.

### What This Demonstrates

```text
First interaction
       ↓
Information retained
       ↓
Customer returns
       ↓
Relevant memory recalled
       ↓
LLM receives previous context
       ↓
Personalized response
       ↓
New interaction retained
```

---

## 🔐 Security

API credentials are stored in environment variables and excluded from version control using `.gitignore`.

The repository does not contain:

* Hindsight API keys
* Groq API keys
* `.env` files
* Python virtual environments

---

## 🎯 Hackathon Focus

RecallDesk was built around the idea that **memory should make AI agents more useful over time**.

The project focuses on demonstrating how persistent memory can improve a real-world customer support workflow by allowing an AI agent to maintain continuity across interactions.

The visible **Memory Retrieved** panel also makes the memory component easy to understand during a live demonstration.

---

## 👥 Team

### RecallDesk Team

Built as part of the **AI Agents That Learn Using Hindsight** hackathon.

**Team Members:**

* [Saladi Vanshika]
* [Ayyagari Srinidhi Reddy]


---

## 🔗 Project Links

**GitHub Repository:**
https://github.com/Vanshika2039/RecallDesk

**Live Demo:**
*live demo link *

**Demo Video:**
*demo video link*

---

## 📌 Project Summary

> **RecallDesk is an AI customer support agent that uses Hindsight-powered persistent memory to remember customer context across interactions and deliver increasingly personalized support.**

Built with **Hindsight + Groq + Python + Flask + HTML/CSS/JavaScript**.

---

## 📄 License

This project was created as a hackathon project for educational and demonstration purposes.
