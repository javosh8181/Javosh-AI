console.log("Javosh AI запущен!");

const input = document.querySelector(".input-box input");
const button = document.querySelector(".input-box button");
const messages = document.querySelector(".messages");

button.addEventListener("click", function () {

    let text = input.value.trim();

    if (text === "") {
        return;
    }

    // Показываем сообщение пользователя
    messages.innerHTML += `
        <p class="user-message">Ты: ${text}</p>
    `;

    input.value = "";

    // Показываем анимацию ожидания
    messages.innerHTML += `
        <p class="bot-message typing">
            Javosh AI: <span>•••</span>
        </p>
    `;

    // Прокручиваем чат вниз
    messages.scrollTop = messages.scrollHeight;

    // Отправляем вопрос Python
    fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text
        })
    })

        .then(response => response.json())

        .then(data => {

            // Удаляем анимацию
            const typing = document.querySelector(".typing");

            if (typing) {
                typing.remove();
            }

            // Показываем ответ AI
            messages.innerHTML += `
                <p class="bot-message">
                    Javosh AI: ${data.answer}
                </p>
            `;

            // Прокручиваем чат вниз
            messages.scrollTop = messages.scrollHeight;
        })

        .catch(error => {

            console.error("Ошибка:", error);

            // Удаляем анимацию
            const typing = document.querySelector(".typing");

            if (typing) {
                typing.remove();
            }

            // Показываем ошибку
            messages.innerHTML += `
                <p class="bot-message">
                    Javosh AI: Ошибка соединения с Python ❌
                </p>
            `;

            messages.scrollTop = messages.scrollHeight;
        });
});