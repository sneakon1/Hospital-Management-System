from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Moved here after app definition

# Load and train the model
try:
    df = pd.read_csv("doctor_data.csv")
    if 'symptom' not in df.columns or 'specialization' not in df.columns:
        raise ValueError("CSV must have 'symptom' and 'specialization' columns")
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())
    model.fit(df['symptom'], df['specialization'])
except Exception as e:
    print("Error loading or training model:", e)
    model = None

@app.route("/suggest_doctor", methods=["POST"])
def suggest_doctor():
    if model is None:
        return jsonify({"error": "Model not available"}), 500

    data = request.get_json()
    symptoms = data.get("symptoms", "")  # Match key with React
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    try:
        prediction = model.predict([symptoms])[0]
        return jsonify({"suggested_specialist": prediction})
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == "__main__":
    app.run(port=5050)
