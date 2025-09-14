from flask import Flask, request, jsonify
from flask_cors import CORS   # allow frontend to call backend

app = Flask(__name__)
CORS(app)  # enable CORS

@app.route("/")
def home():
    return "🚀 Spam Classifier Backend is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    message = data.get("message", "")

    # Dummy logic (replace with ML model later)
    if "win" in message.lower() or "free" in message.lower() or "click" in message.lower():
        result = "spam"
    else:
        result = "ham"

    return jsonify({"prediction": result})
