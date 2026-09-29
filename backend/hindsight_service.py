import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

# Load variables from .env
load_dotenv()

# Hindsight configuration
HINDSIGHT_API_URL = os.getenv("HINDSIGHT_API_URL")
HINDSIGHT_API_KEY = os.getenv("HINDSIGHT_API_KEY")

# Our Hindsight memory bank
BANK_ID = "recall_desk_customer_support"

# Create Hindsight client
client = Hindsight(
    base_url=HINDSIGHT_API_URL,
    api_key=HINDSIGHT_API_KEY
)


def store_memory(content):
    """
    Store customer information/conversation in Hindsight.
    """
    try:
        client.retain(
            bank_id=BANK_ID,
            content=content
        )

        return True

    except Exception as e:
        print(f"Hindsight retain error: {e}")
        return False


def recall_memory(query):
    """
    Search Hindsight for memories relevant to the customer's message.
    """
    try:
        result = client.recall(
            bank_id=BANK_ID,
            query=query
        )

        memories = []

        for memory in result.results:
            memories.append(memory.text)

        return memories

    except Exception as e:
        print(f"Hindsight recall error: {e}")
        return []