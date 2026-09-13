console.log("Javosh AI запущен!");

const input = document.querySelector(".input-box input");
const button = document.querySelector(".input-box button");
const messages = document.querySelector(".messages");

button.addEventListener("click", function () {

    let text = input.value.trim();

    if (text === "") {
        return;
    }

    messages.innerHTML += `
        <p class="user-message">Ты: ${text}</p>
    `;

    input.value = "";

    messages.innerHTML += `
        <p class="bot-message typing">
            Javosh AI: <span>•••</span>
        </p>
    `;

    messages.scrollTop = messages.scrollHeight;

    function sendMessage(text, attempt = 1) {

        fetch("https://javosh-ai.onrender.com/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        })

            .then(response => {

                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                return response.json();
            })

            .then(data => {

                const typing = document.querySelector(".typing");

                if (typing) {
                    typing.remove();
                }

                messages.innerHTML += `
                <p class="bot-message">
                    Javosh AI: ${data.answer}
                </p>
            `;

                messages.scrollTop = messages.scrollHeight;
            })

            .catch(error => {

                console.error("Ошибка:", error);

                if (attempt < 3) {

                    console.log("Повторная попытка:", attempt + 1);

                    setTimeout(function () {
                        sendMessage(text, attempt + 1);
                    }, 3000);

                    return;
                }

                const typing = document.querySelector(".typing");

                if (typing) {
                    typing.remove();
                }

                messages.innerHTML += `
                <p class="bot-message">
                    Javosh AI: Ошибка соединения с Python ❌
                </p>
            `;

                messages.scrollTop = messages.scrollHeight;
            });
    }
});