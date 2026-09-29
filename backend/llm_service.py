import os
from dotenv import load_dotenv
from groq import Groq

# Load variables from .env
load_dotenv()

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Create Groq client
client = Groq(api_key=GROQ_API_KEY)


def generate_response(customer_message, memories):
    """
    Generate a customer-support response using
    the current message and relevant Hindsight memories.
    """

    # Convert memories into readable text
    if memories:
        memory_text = "\n".join(
            f"- {memory}" for memory in memories
        )
    else:
        memory_text = "No previous customer information was found."

    system_prompt = """
You are RecallDesk, an AI customer support agent.

Your job is to provide helpful, polite, and personalized
customer support.

You have access to memories about the customer from previous
conversations.

IMPORTANT:
- Use relevant customer memories when answering.
- Do not mention Hindsight, memory systems, APIs, or internal tools.
- Do not invent customer information.
- If there is no relevant memory, answer normally.
- Keep responses clear and reasonably concise.
"""

    user_prompt = f"""
Previous customer information:
{memory_text}

Current customer message:
{customer_message}

Using the relevant previous information, provide the best
customer-support response.
"""

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            temperature=0.3
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Groq error: {e}")
        return "Sorry, I encountered an error while processing your request."