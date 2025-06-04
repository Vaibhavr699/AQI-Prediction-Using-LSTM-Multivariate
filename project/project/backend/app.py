from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import datetime

app = Flask(__name__)
CORS(app)

model = joblib.load("model/rf_model.pkl")
scaler = joblib.load("model/scaler.pkl")
feature_names = joblib.load("model/feature_names.pkl")

default_avg = 80.0
default_pollutant = "PM2.5"

def get_city_dummies(city_name):
    city_features = {col: 0 for col in feature_names if col.startswith("City_")}
    city_key = f"City_{city_name}"
    if city_key in city_features:
        city_features[city_key] = 1
    return city_features

def get_pollutant_dummies(pollutant):
    pollutant_features = {col: 0 for col in feature_names if col.startswith("Pollutant_")}
    pollutant_key = f"Pollutant_{pollutant}"
    if pollutant_key in pollutant_features:
        pollutant_features[pollutant_key] = 1
    return pollutant_features

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    city = data.get("city")

    if not city:
        return jsonify({"error": "City not provided"}), 400

    today = datetime.datetime.now()
    predictions = []
    prev_avg = default_avg  # start with default

    for i in range(7):
        day = today + datetime.timedelta(days=i)

        features = {
            "Avg": prev_avg,
            "hour": day.hour,            # usually 0, but kept for consistency
            "day": day.day,
            "month": day.month,
            "weekday": day.weekday()     # Monday=0, Sunday=6
        }

        features.update(get_city_dummies(city))
        features.update(get_pollutant_dummies(default_pollutant))

        # Fill missing features with 0
        for col in feature_names:
            if col not in features:
                features[col] = 0

        X_input = pd.DataFrame([features])[feature_names]
        X_scaled = scaler.transform(X_input)
        predicted_aqi = model.predict(X_scaled)[0]

        predictions.append({
            "date": day.strftime("%Y-%m-%d"),
            "predicted_aqi": round(predicted_aqi, 2)
        })

        prev_avg = predicted_aqi  # feed predicted AQI as next day's Avg

    return jsonify({"city": city, "predictions": predictions})

if __name__ == "__main__":
    app.run(debug=True)
