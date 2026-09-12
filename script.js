console.log("Javosh AI запущен!");

const input = document.querySelector(".input-box input");
const button = document.querySelector(".input-box button");
const messages = document.querySelector(".messages");

button.addEventListener("click", function () {

    let text = input.value.toLowerCase().trim();

    messages.innerHTML += `<p class="user-message">Ты: ${input.value}</p>`;

    input.value = "";

    messages.innerHTML += `<p class="bot-message typing">Javosh AI: <span>•••</span></p>`;

    setTimeout(function () {

        document.querySelector(".typing").remove();

        if (text === "привет") {
            messages.innerHTML += `<p class="bot-message">Javosh AI: Привет! 👋</p>`;
        } else if (text === "как дела") {
            messages.innerHTML += `<p class="bot-message">Javosh AI: У меня всё хорошо!</p>`;
        } else if (text === "как тебя зовут") {
            messages.innerHTML += `<p class="bot-message">Javosh AI: Меня зовут Javosh AI!</p>`;
        } else if (text === "что ты умеешь") {
            messages.innerHTML += `<p class="bot-message">Javosh AI: Я умею отвечать на легкие вопросы!</p>`;
        } else {
            messages.innerHTML += `<p class="bot-message">Javosh AI: Я пока не знаю этот вопрос.</p>`;
        }

    }, 1500);
});