from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from datetime import datetime

import os

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


@app.route("/ask", methods=["POST"])
def ask():

    data = request.json
    text = data.get("message", "")

    print("Вопрос:", text)

    now = datetime.now()

    current_date = now.strftime("%d.%m.%Y")
    current_time = now.strftime("%H:%M:%S")
    day_of_week = now.strftime("%A")

    days = {
        "Monday": "понедельник",
        "Tuesday": "вторник",
        "Wednesday": "среда",
        "Thursday": "четверг",
        "Friday": "пятница",
        "Saturday": "суббота",
        "Sunday": "воскресенье"
    }

    day_of_week = days[day_of_week]

    current_info = f"""
Сегодня: {current_date}
День недели: {day_of_week}
Текущее время: {current_time}
"""

    response = client.responses.create(
        model="gpt-5.6-luna",

        instructions=f"""
Ты — Javosh AI, личный AI-ассистент пользователя.

Твои правила:
- Никогда не называй себя ChatGPT.
- Если тебя спрашивают «кто ты?» или «как тебя зовут?», отвечай:
  «Я Javosh AI — твой AI-ассистент.»
- Всегда отвечай на русском языке.
- Отвечай понятно и дружелюбно.
- Используй информацию о текущей дате и времени ниже, когда пользователь спрашивает про дату, день недели или время.

Текущая информация:
{current_info}
""",

        input=text
    )

    answer = response.output_text

    return jsonify({
        "answer": answer
    })


app.run(debug=True)