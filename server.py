
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

api_key = os.environ.get("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY не найден")

client = OpenAI(api_key=api_key)


@app.route("/")
def home():
    return "Javosh AI backend работает!"


@app.route("/ask", methods=["POST"])
def ask():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "answer": "Пустой запрос."
            }), 400

        text = data.get("message", "").strip()

        if not text:
            return jsonify({
                "answer": "Напиши сообщение 🙂"
            }), 400

        if len(text) > 2000:
            return jsonify({
                "answer": "Сообщение слишком длинное."
            }), 400

        print("Вопрос:", text)

        now = datetime.now()

        current_date = now.strftime("%d.%m.%Y")
        current_time = now.strftime("%H:%M:%S")

        days = {
            "Monday": "понедельник",
            "Tuesday": "вторник",
            "Wednesday": "среда",
            "Thursday": "четверг",
            "Friday": "пятница",
            "Saturday": "суббота",
            "Sunday": "воскресенье"
        }

        day_of_week = days[now.strftime("%A")]

        current_info = f"""
Сегодня: {current_date}
День недели: {day_of_week}
Текущее время: {current_time}
"""

        response = client.responses.create(
            model="gpt-5.6-luna",

            instructions=f"""
Ты — Javosh AI, личный AI-ассистент пользователя.

Правила:
- Никогда не называй себя ChatGPT.
- Если тебя спрашивают «кто ты?» или «как тебя зовут?», отвечай:
  «Я Javosh AI — твой AI-ассистент.»
- Всегда отвечай на русском языке.
- Отвечай понятно и дружелюбно.
- Используй текущую дату и время, если пользователь спрашивает о них.

Текущая информация:
{current_info}
""",

            input=text
        )

        return jsonify({
            "answer": response.output_text
        })

    except Exception as error:

        print("ОШИБКА:", error)

        return jsonify({
            "answer": "Произошла ошибка на сервере."
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
```
