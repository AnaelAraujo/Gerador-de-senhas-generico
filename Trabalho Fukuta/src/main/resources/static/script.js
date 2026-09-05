const totalEl = document.getElementById("total");
const listEl = document.getElementById("password-list");
const lastEl = document.getElementById("last-password");
const statusEl = document.getElementById("status");

const normalButton = document.getElementById("normal-button");
const priorityButton = document.getElementById("priority-button");
const elderlyButton = document.getElementById("elderly-button");

const clearButton = document.getElementById("clear-passwords");

// TELAS
const generatorScreen = document.getElementById("generator-screen");
const historyScreen = document.getElementById("history-screen");

const showHistoryButton = document.getElementById("show-history");
const backButton = document.getElementById("back-button");


async function iniciar() {
    try {

        // Toda vez que a página for recarregada,
        // apaga todas as senhas do backend
        const response = await fetch("/api/senhas", {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao limpar senhas");
        }

        lastEl.textContent = "-";
        statusEl.textContent = "";

        await carregar();

    } catch (erro) {
        console.error("Erro ao iniciar:", erro);
        statusEl.textContent = "Erro ao iniciar o sistema.";
    }
}

async function carregar() {
    try {

        const response = await fetch("/api/senhas");

        if (!response.ok) {
            throw new Error("Erro ao buscar senhas");
        }

        const senhas = await response.json();

        totalEl.textContent = senhas.length;

        renderizar(senhas);

    } catch (erro) {
        console.error(erro);
        statusEl.textContent = "Erro ao carregar as senhas.";
    }
}

function renderizar(senhas) {

    if (senhas.length === 0) {

        listEl.innerHTML = `
            <div class="empty">
                Ainda não há senhas.
            </div>
        `;

        return;
    }

    listEl.innerHTML = senhas.map((item, index) => `
        <div class="password-item">

            <span class="password-number">
                #${index + 1}
            </span>

            <span class="password-value">
                ${item.senha}
            </span>

            <span class="password-type">
                ${item.tipo}
            </span>

        </div>
    `).join("");
}

async function gerarSenha(tipo) {
    try {

        statusEl.textContent = "Gerando senha...";

        const response = await fetch(`/api/senhas?tipo=${tipo}`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Erro ao gerar senha.");
        }

        const senha = await response.json();

        lastEl.textContent = senha.senha;

        statusEl.textContent = "Senha gerada com sucesso!";

        await carregar();

    } catch (erro) {
        console.error(erro);
        statusEl.textContent = "Erro ao gerar senha.";
    }
}

async function apagarSenhas() {
    try {

        const response = await fetch("/api/senhas", {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao apagar senhas");
        }

        lastEl.textContent = "-";
        statusEl.textContent = "Todas as senhas foram apagadas.";

        await carregar();

    } catch (erro) {
        console.error(erro);
        statusEl.textContent = "Erro ao apagar as senhas.";
    }
}


showHistoryButton.addEventListener("click", async () => {

    // Atualiza a lista antes de mostrar
    await carregar();

    generatorScreen.classList.add("hidden");
    historyScreen.classList.remove("hidden");
});


backButton.addEventListener("click", () => {

    historyScreen.classList.add("hidden");
    generatorScreen.classList.remove("hidden");
});


normalButton.addEventListener("click", () => {
    gerarSenha("normal");
});

priorityButton.addEventListener("click", () => {
    gerarSenha("prioridade");
});

elderlyButton.addEventListener("click", () => {
    gerarSenha("idoso");
});


clearButton.addEventListener("click", apagarSenhas);

iniciar();