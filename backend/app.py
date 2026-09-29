from flask import Flask, request, jsonify
from flask_cors import CORS

from hindsight_service import store_memory, recall_memory
from llm_service import generate_response


app = Flask(__name__)

CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "RecallDesk backend is running!"
    })


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        customer_name = data.get("customer_name", "Customer")
        customer_message = data.get("message", "").strip()

        if not customer_message:
            return jsonify({
                "error": "Customer message is required."
            }), 400

        memory_content = (
            f"{customer_name} said: {customer_message}"
        )

        store_memory(memory_content)

        memories = recall_memory(customer_message)

        response = generate_response(
            customer_message,
            memories
        )

        return jsonify({
            "customer_name": customer_name,
            "message": response,
            "memories": memories
        })

    except Exception as e:
        print(f"Server error: {e}")

        return jsonify({
            "error": "Something went wrong while processing the request."
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )