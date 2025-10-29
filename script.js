// Sistema principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Extensionias I - Iniciando...');
    initApp();
});

function initApp() {
    loadProgress();
    createGamesGrid();
    createGamesContainers();
    setupEventListeners();
    initGames();
    initDarkMode();
    initProgressSystem();
}

// Sistema de progresso
let userProgress = {
    completedGames: [],
    achievements: [],
    currentStreak: 0
};

let currentGameId = null;

const gamesData = [
    { id: 1, name: '📝 Lista de Compras', icon: '📝', type: 'basic', color: 'primary' },
    { id: 2, name: '🧮 Calculadora', icon: '🧮', type: 'basic', color: 'primary' },
    { id: 3, name: '💡 Luzes da Casa', icon: '💡', type: 'basic', color: 'primary' },
    { id: 4, name: '🎨 CSS Básico', icon: '🎨', type: 'css', color: 'success' },
    { id: 5, name: '📦 Variáveis JS', icon: '📦', type: 'js', color: 'success' },
    { id: 6, name: '⚙️ Funções JS', icon: '⚙️', type: 'js', color: 'success' },
    { id: 7, name: '🎨 Cores CSS', icon: '🎨', type: 'css', color: 'warning' },
    { id: 8, name: '🔤 Fontes CSS', icon: '🔤', type: 'css', color: 'warning' },
    { id: 9, name: '💫 Designer CSS', icon: '💫', type: 'css', color: 'warning' }
];

function createGamesGrid() {
    const grid = document.getElementById('games-grid');
    grid.innerHTML = gamesData.map(game => `
        <div class="col-md-6 col-lg-4">
            <div class="module-card card h-100 ${userProgress.completedGames.includes(game.id) ? 'completed' : ''}">
                <div class="card-body">
                    <h4 class="card-title">${game.name}</h4>
                    <p class="card-text">${getGameDescription(game.id)}</p>
                    <div class="mt-3">
                        <button class="btn btn-${game.color} w-100 start-game" data-game="${game.id}">
                            ${game.type === 'basic' ? 'Começar Jogo' : game.type === 'css' ? 'Escrever Código' : 'Programar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getGameDescription(gameId) {
    const descriptions = {
        1: 'Aprenda sobre LISTAS (arrays) criando uma lista de compras.',
        2: 'Aprenda sobre VARIÁVEIS e CÁLCULOS com uma calculadora simples.',
        3: 'Aprenda sobre CONDIÇÕES (IF/ELSE) controlando luzes de uma casa.',
        4: 'Escreva código CSS para mudar cores e estilos da página.',
        5: 'Aprenda a criar e usar variáveis em JavaScript.',
        6: 'Crie funções simples para automatizar tarefas.',
        7: 'Aprenda a mudar cores de texto e fundo com CSS.',
        8: 'Aprenda a mudar fontes, tamanhos e estilos de texto.',
        9: 'Desafios completos de design com CSS.'
    };
    return descriptions[gameId] || 'Jogo educativo de programação.';
}

function createGamesContainers() {
    const container = document.getElementById('games-container');
    container.innerHTML = gamesData.map(game => createGameHTML(game)).join('');
}

function createGameHTML(game) {
    const baseGames = {
        1: createShoppingListHTML(),
        2: createCalculatorHTML(),
        3: createLightsHTML()
    };

    if (baseGames[game.id]) return baseGames[game.id];

    if (game.type === 'css') {
        return createCssGameHTML(game);
    } else if (game.type === 'js') {
        return createJsGameHTML(game);
    }

    return `<div class="game-container" id="game-${game.id}-container" style="display: none;">
        <h3>${game.name}</h3>
        <p>Jogo em desenvolvimento...</p>
    </div>`;
}

function createShoppingListHTML() {
    return `
    <div class="game-container" id="game-1-container">
        <div class="row">
            <div class="col-lg-6">
                <h3>📝 Lista de Compras</h3>
                <p class="text-muted">Uma LISTA é como uma lista de compras - vários itens em uma só variável.</p>
                <div class="mb-4">
                    <div class="input-group">
                        <input type="text" class="form-control" id="item-input" placeholder="Digite um item (ex: arroz, feijão...)">
                        <button class="btn btn-success" id="add-item">Adicionar</button>
                    </div>
                </div>
                <div class="shopping-list-container">
                    <h5>Sua Lista de Compras:</h5>
                    <div id="shopping-list" class="shopping-list"></div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-warning me-2" id="clear-list">🗑️ Limpar Lista</button>
                    <button class="btn btn-info" id="show-code-1">👀 Ver Código</button>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="code-explanation">
                    <h5>💡 Como funciona:</h5>
                    <p><strong>LISTA (Array):</strong> É como uma caixa onde guardamos vários itens.</p>
                    <p><strong>Exemplo no dia a dia:</strong> Lista de compras, lista de nomes, lista de tarefas.</p>
                    <div class="code-example mt-3">
                        <h6>📋 Código Simples:</h6>
                        <div class="code-block">
                            <code>let listaCompras = [];<br>listaCompras.push("arroz");<br>listaCompras.push("feijão");<br>console.log(listaCompras);</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function createCalculatorHTML() {
    return `
    <div class="game-container" id="game-2-container" style="display: none;">
        <div class="row">
            <div class="col-lg-6">
                <h3>🧮 Calculadora Simples</h3>
                <p class="text-muted">VARIÁVEIS guardam informações, como números em uma calculadora.</p>
                <div class="calculator">
                    <div class="row mb-3">
                        <div class="col"><input type="number" class="form-control" id="num1" placeholder="Primeiro número" value="10"></div>
                        <div class="col"><input type="number" class="form-control" id="num2" placeholder="Segundo número" value="5"></div>
                    </div>
                    <div class="btn-group w-100 mb-3">
                        <button class="btn btn-outline-primary operation-btn" data-op="+">+ Soma</button>
                        <button class="btn btn-outline-primary operation-btn" data-op="-">- Subtrai</button>
                        <button class="btn btn-outline-primary operation-btn" data-op="*">× Multiplica</button>
                        <button class="btn btn-outline-primary operation-btn" data-op="/">÷ Divide</button>
                    </div>
                    <div class="result-container p-3 bg-light rounded">
                        <h5>Resultado: <span id="calc-result">0</span></h5>
                    </div>
                </div>
                <button class="btn btn-info mt-3" id="show-code-2">👀 Ver Código</button>
            </div>
            <div class="col-lg-6">
                <div class="code-explanation">
                    <h5>💡 Como funciona:</h5>
                    <p><strong>VARIÁVEIS:</strong> São como caixinhas que guardam informações.</p>
                    <div class="code-example mt-3">
                        <h6>📋 Código Simples:</h6>
                        <div class="code-block">
                            <code>let numero1 = 10;<br>let numero2 = 5;<br>let soma = numero1 + numero2;<br>console.log("Soma: " + soma);</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function createLightsHTML() {
    return `
    <div class="game-container" id="game-3-container" style="display: none;">
        <div class="row">
            <div class="col-lg-6">
                <h3>💡 Luzes da Casa</h3>
                <p class="text-muted">CONDIÇÕES (IF/ELSE) são como interruptores.</p>
                <div class="house-lights">
                    ${['Sala de Estar', 'Quarto', 'Cozinha'].map((room, i) => `
                    <div class="room mb-4 p-3 border rounded">
                        <h5>${room}</h5>
                        <div class="light-switch">
                            <span class="me-2">Luz:</span>
                            <div class="btn-group">
                                <button class="btn ${i === 0 ? 'btn-success' : 'btn-outline-secondary'} light-btn" data-room="${room.toLowerCase().replace(' ', '-')}" data-state="on">🔆 Acesa</button>
                                <button class="btn ${i === 1 ? 'btn-success' : 'btn-outline-secondary'} light-btn" data-room="${room.toLowerCase().replace(' ', '-')}" data-state="off">💡 Apagada</button>
                                ${i === 2 ? '<button class="btn btn-warning light-btn" data-room="cozinha" data-state="auto">🤖 Automático</button>' : ''}
                            </div>
                        </div>
                        <div class="light-bulb ${i === 0 ? 'on' : i === 1 ? 'off' : 'auto'} mt-2" id="${room.toLowerCase().replace(' ', '-')}-light">💡</div>
                        ${i === 2 ? '<small class="text-muted">Automático: acende só de noite</small>' : ''}
                    </div>
                    `).join('')}
                </div>
                <button class="btn btn-info mt-3" id="show-code-3">👀 Ver Código</button>
            </div>
            <div class="col-lg-6">
                <div class="code-explanation">
                    <h5>💡 Como funciona:</h5>
                    <p><strong>CONDIÇÕES (IF/ELSE):</strong> São decisões como "SE chove, ENTÃO levo guarda-chuva".</p>
                    <div class="code-example mt-3">
                        <h6>📋 Código Simples:</h6>
                        <div class="code-block">
                            <code>let estaEscuro = true;<br>if (estaEscuro) {<br>&nbsp;&nbsp;console.log("Acender a luz");<br>} else {<br>&nbsp;&nbsp;console.log("Apagar a luz");<br>}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function createCssGameHTML(game) {
    const challenges = {
        4: [
            { title: 'Mudar cor de fundo', preview: 'Este quadrado vai mudar de cor!', placeholder: '' },
            { title: 'Mudar cor do texto', preview: 'Este texto vai mudar de cor!', placeholder: '' },
            { title: 'Centralizar texto', preview: 'Este texto vai ficar centralizado!', placeholder: '' }
        ],
        7: [
            { title: 'Cor do Texto', preview: 'Este texto precisa ficar vermelho!', placeholder: '' },
            { title: 'Cor de Fundo', preview: 'Este fundo precisa ficar azul claro!', placeholder: '' },
            { title: 'Combinação de Cores', preview: 'Texto branco em fundo verde!', placeholder: '' }
        ],
        8: [
            { title: 'Tamanho da Fonte', preview: 'Este texto precisa ficar maior!', placeholder: "" },
            { title: 'Família da Fonte', preview: 'Este texto precisa ter fonte Arial!', placeholder: '' },
            { title: 'Estilo da Fonte', preview: 'Este texto precisa ficar em negrito e itálico!', placeholder: '' }
        ],
        9: [
            { title: 'Cartão de Apresentação', preview: '<h4>Maria Silva</h4><p>Desenvolvedora Web</p><p>maria@email.com</p>', placeholder: 'background-color: #2c3e50; color: white; padding: 20px; border-radius: 10px;' },
            { title: 'Botão Moderno', preview: '<button class="btn-custom" style="background: gray; color: white; padding: 10px 20px; border: none;">Clique Aqui</button>', placeholder: 'background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 25px;' }
        ]
    };

    return `
    <div class="game-container" id="game-${game.id}-container" style="display: none;">
        <div class="row">
            <div class="col-lg-6">
                <h3>${game.name}</h3>
                <p class="text-muted">${getGameDescription(game.id)}</p>
                ${game.id === 4 ? '<div class="alert alert-info"><i class="bi bi-info-circle me-2"></i><strong>Importante:</strong> Na programação usamos termos em inglês.</div>' : ''}
                ${(challenges[game.id] || []).map((challenge, index) => `
                <div class="challenge-card mb-4">
                    <h5>Desafio ${index + 1}: ${challenge.title}</h5>
                    <p>Escreva CSS para ${challenge.title.toLowerCase()}:</p>
                    <div class="preview-box" id="${game.id === 9 ? 'design' : game.id === 7 ? 'color' : game.id === 8 ? 'font' : 'basic'}-preview-${index + 1}">${challenge.preview}</div>
                    <div class="mt-2">
                        <textarea class="form-control code-input" id="${game.id === 9 ? 'design' : game.id === 7 ? 'color' : game.id === 8 ? 'font' : 'basic'}-code-${index + 1}" placeholder="${challenge.placeholder}" rows="3"></textarea>
                        <button class="btn btn-primary mt-2 test-css-btn" data-type="${game.id === 9 ? 'design' : game.id === 7 ? 'color' : game.id === 8 ? 'font' : 'basic'}" data-challenge="${index + 1}">🎯 Testar Código</button>
                        <button class="btn btn-outline-secondary mt-2 solution-css-btn" data-type="${game.id === 9 ? 'design' : game.id === 7 ? 'color' : game.id === 8 ? 'font' : 'basic'}" data-challenge="${index + 1}">💡 Solução</button>
                    </div>
                    <div id="${game.id === 9 ? 'design' : game.id === 7 ? 'color' : game.id === 8 ? 'font' : 'basic'}-feedback-${index + 1}" class="mt-2"></div>
                </div>
                `).join('')}
            </div>
            <div class="col-lg-6">
                <div class="code-guide">
                    <h5>📚 Guia ${game.name.split(' ')[0]}</h5>
                    ${getCssGuide(game.id)}
                </div>
            </div>
        </div>
    </div>`;
}

function getCssGuide(gameId) {
    const guides = {
        4: `
            <div class="guide-item"><strong>Cor de fundo:</strong><code>background-color: blue;</code></div>
            <div class="guide-item"><strong>Cor do texto:</strong><code>color: red;</code></div>
            <div class="guide-item"><strong>Alinhar texto:</strong><code>text-align: center;</code></div>
            <div class="mt-3"><h6>🎯 Dicas:</h6><ul class="small"><li>Sempre termine com ponto e vírgula</li><li>Cores em inglês</li></ul></div>
        `,
        7: `
            <div class="color-grid">
                <div class="color-item" style="background:red;color:white">red</div>
                <div class="color-item" style="background:blue;color:white">blue</div>
                <div class="color-item" style="background:green;color:white">green</div>
                <div class="color-item" style="background:lightblue">lightblue</div>
                <div class="color-item" style="background:lightgreen">lightgreen</div>
                <div class="color-item" style="background:white;border:1px solid #ddd">white</div>
            </div>
        `,
        8: `
            <div class="guide-item"><strong>Tamanho:</strong><code>font-size: 24px;</code></div>
            <div class="guide-item"><strong>Família:</strong><code>font-family: Arial;</code></div>
            <div class="guide-item"><strong>Estilo:</strong><code>font-weight: bold;</code></div>
        `,
        9: `
            <div class="guide-item"><strong>Bordas:</strong><code>border-radius: 10px;</code></div>
            <div class="guide-item"><strong>Sombra:</strong><code>box-shadow: 2px 2px 10px gray;</code></div>
            <div class="guide-item"><strong>Espaçamento:</strong><code>padding: 20px;</code></div>
        `
    };
    return guides[gameId] || '<p>Guia em desenvolvimento...</p>';
}

function createJsGameHTML(game) {
    const challenges = {
        5: [
            { title: 'Criar uma variável', desc: 'Crie uma variável chamada <code>idade</code> com o valor 25:', code: '// Escreva seu código abaixo' },
            { title: 'Variáveis com texto', desc: 'Crie uma variável <code>nome</code> com seu nome e mostre "Olá, [nome]!":', code: '// Escreva seu código abaixo' },
            { title: 'Cálculo com variáveis', desc: 'Crie variáveis para preço e quantidade, depois calcule o total:', code: 'let preco = 10;\nlet quantidade = 3;\n// Calcule o total' }
        ],
        6: [
            { title: 'Função de saudação', desc: 'Crie uma função que mostra "Bom dia!" quando chamada:', code: '// Crie a função aqui\n\n// Depois chame a função aqui' },
            { title: 'Função com parâmetro', desc: 'Crie uma função que recebe um nome e mostra "Olá, [nome]!":', code: '// Crie a função aqui\n\n// Depois chame a função com um nome' },
            { title: 'Função de cálculo', desc: 'Crie uma função que calcula a área de um retângulo (largura × altura):', code: '// Crie a função aqui\n\n// Depois chame a função com números\n// Exemplo: calcularArea(5, 3)' }
        ]
    };

    return `
    <div class="game-container" id="game-${game.id}-container" style="display: none;">
        <div class="row">
            <div class="col-lg-6">
                <h3>${game.name}</h3>
                <p class="text-muted">${getGameDescription(game.id)}</p>
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>${game.id === 5 ? 'Lembrete:' : 'O que são funções:'}</strong>
                    ${game.id === 5 ? 'Em JavaScript usamos <code>let</code> para criar variáveis.' : 'São como receitas - você escreve uma vez e usa várias vezes!'}
                </div>
                ${(challenges[game.id] || []).map((challenge, index) => `
                <div class="challenge-card mb-4">
                    <h5>Desafio ${index + 1}: ${challenge.title}</h5>
                    <p>${challenge.desc}</p>
                    <div class="mt-2">
                        <textarea class="form-control code-input" id="js-code-${game.id === 5 ? index + 1 : index + 4}" placeholder="Escreva seu código JavaScript aqui..." rows="4">${challenge.code}</textarea>
                        <button class="btn btn-primary mt-2 test-js-btn" data-type="${game.id === 5 ? 'var' : 'function'}" data-challenge="${game.id === 5 ? index + 1 : index + 4}">▶️ Executar Código</button>
                        <button class="btn btn-outline-secondary mt-2 solution-js-btn" data-type="${game.id === 5 ? 'var' : 'function'}" data-challenge="${game.id === 5 ? index + 1 : index + 4}">💡 Solução</button>
                    </div>
                    <div class="mt-2">
                        <strong>Resultado:</strong>
                        <div id="js-result-${game.id === 5 ? index + 1 : index + 4}" class="result-box">Aguardando código...</div>
                    </div>
                    <div id="js-feedback-${game.id === 5 ? index + 1 : index + 4}" class="mt-2"></div>
                </div>
                `).join('')}
            </div>
            <div class="col-lg-6">
                <div class="code-guide">
                    <h5>📚 Guia ${game.name.split(' ')[0]}</h5>
                    ${getJsGuide(game.id)}
                </div>
            </div>
        </div>
    </div>`;
}

function getJsGuide(gameId) {
    const guides = {
        5: `
            <div class="guide-item"><strong>Criar variável:</strong><code>let idade = 25;</code></div>
            <div class="guide-item"><strong>Texto (string):</strong><code>let nome = "Maria";</code></div>
            <div class="guide-item"><strong>Mostrar no console:</strong><code>console.log(idade);</code></div>
            <div class="guide-item"><strong>Juntar textos:</strong><code>console.log("Olá, " + nome);</code></div>
        `,
        6: `
            <div class="guide-item"><strong>Função simples:</strong><code>function saudacao() {<br>&nbsp;&nbsp;console.log("Olá!");<br>}</code></div>
            <div class="guide-item"><strong>Função com parâmetro:</strong><code>function cumprimentar(nome) {<br>&nbsp;&nbsp;console.log("Olá, " + nome);<br>}</code></div>
            <div class="guide-item"><strong>Função que retorna:</strong><code>function somar(a, b) {<br>&nbsp;&nbsp;return a + b;<br>}</code></div>
        `
    };
    return guides[gameId] || '<p>Guia em desenvolvimento...</p>';
}

// ... (o resto do JavaScript permanece igual, mas otimizado)
// [As funções restantes são as mesmas do código anterior, mas otimizadas]

// Sistema de progresso
function loadProgress() {
    const saved = localStorage.getItem('extensionias-progress');
    if (saved) userProgress = JSON.parse(saved);
}

function saveProgress() {
    localStorage.setItem('extensionias-progress', JSON.stringify(userProgress));
    updateProgressDisplay();
}

function initProgressSystem() {
    document.getElementById('show-progress').addEventListener('click', toggleProgress);
    updateProgressDisplay();
}

function toggleProgress() {
    const container = document.getElementById('progress-container');
    container.style.display = container.style.display === 'block' ? 'none' : 'block';
    if (container.style.display === 'block') updateProgressDisplay();
}

function updateProgressDisplay() {
    const progressList = document.getElementById('progress-list');
    const overallProgress = document.getElementById('overall-progress');
    const progressText = document.getElementById('progress-text');
    
    if (!progressList) return;
    
    progressList.innerHTML = gamesData.map(game => {
        const isCompleted = userProgress.completedGames.includes(game.id);
        return `
            <div class="progress-game ${isCompleted ? 'completed' : ''}" onclick="startGame(${game.id})">
                <div class="progress-icon ${isCompleted ? 'completed' : 'incomplete'}">
                    ${isCompleted ? '✓' : game.icon}
                </div>
                <div class="flex-grow-1">
                    <strong>${game.name}</strong>
                    <div class="small text-muted">${isCompleted ? 'Concluído' : 'Não iniciado'}</div>
                </div>
            </div>
        `;
    }).join('');
    
    const completedCount = userProgress.completedGames.length;
    const progressPercent = (completedCount / gamesData.length) * 100;
    overallProgress.style.width = `${progressPercent}%`;
    progressText.textContent = `${completedCount} de ${gamesData.length} jogos completados`;
}

// Sistema de modo escuro
function initDarkMode() {
    const toggleBtn = document.getElementById('toggle-dark-mode');
    const isDark = localStorage.getItem('dark-mode') === 'true';
    
    if (isDark) document.body.classList.add('dark-mode');
    
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isNowDark);
        this.innerHTML = isNowDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    });
}

// Sistema de dicas
const gameHints = {
    1: "💡 Dica: Use o método push() para adicionar itens à lista!",
    2: "💡 Dica: Variáveis guardam valores que podem ser usados em cálculos!",
    3: "💡 Dica: Condições IF/ELSE tomam decisões baseadas em situações!",
    4: "💡 Dica: Em CSS, use background-color para fundo e color para texto!",
    5: "💡 Dica: Use 'let' para criar variáveis e 'console.log()' para mostrar valores!",
    6: "💡 Dica: Funções são blocos de código reutilizáveis!",
    7: "💡 Dica: Cores em inglês: red, blue, green, yellow, etc!",
    8: "💡 Dica: font-size para tamanho, font-family para tipo de fonte!",
    9: "💡 Dica: Combine cores, fontes e bordas para criar designs incríveis!"
};

function showHint() {
    const hintContainer = document.getElementById('hint-container');
    const hintText = document.getElementById('hint-text');
    
    if (currentGameId && gameHints[currentGameId]) {
        hintText.textContent = gameHints[currentGameId];
        hintContainer.classList.toggle('show');
    }
}

function markGameCompleted(gameId) {
    if (!userProgress.completedGames.includes(gameId)) {
        userProgress.completedGames.push(gameId);
        userProgress.currentStreak++;
        saveProgress();
        showCompletionAnimation();
        
        const gameCard = document.querySelector(`.start-game[data-game="${gameId}"]`)?.closest('.module-card');
        if (gameCard) gameCard.classList.add('completed');
    }
}

function showCompletionAnimation() {
    createConfetti();
    const currentGame = document.getElementById(`game-${currentGameId}-container`);
    if (currentGame) {
        currentGame.classList.add('success-pulse');
        setTimeout(() => currentGame.classList.remove('success-pulse'), 1000);
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4a7bc8', '#28a745', '#ffc107', '#6f42c1'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            left: ${Math.random() * 100}vw;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation: confetti ${Math.random() * 3 + 2}s ease-out forwards;
            animation-delay: ${Math.random()}s;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Sistema de eventos
function setupEventListeners() {
    // Botões de iniciar jogo
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('start-game')) {
            const gameId = e.target.getAttribute('data-game');
            startGame(gameId);
        }
    });

    // Botão de voltar ao menu
    document.getElementById('back-to-menu').addEventListener('click', function() {
        document.getElementById('games').style.display = 'none';
        document.getElementById('modules').style.display = 'block';
    });

    // Botão de dicas
    document.getElementById('hint-btn').addEventListener('click', showHint);

    // Botões de CSS e JavaScript
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('test-css-btn')) {
            const type = e.target.getAttribute('data-type');
            const challenge = e.target.getAttribute('data-challenge');
            testCssCode(type, challenge);
        }
        if (e.target.classList.contains('solution-css-btn')) {
            const type = e.target.getAttribute('data-type');
            const challenge = e.target.getAttribute('data-challenge');
            showCssSolution(type, challenge);
        }
        if (e.target.classList.contains('test-js-btn')) {
            const type = e.target.getAttribute('data-type');
            const challenge = e.target.getAttribute('data-challenge');
            testJsCode(type, challenge);
        }
        if (e.target.classList.contains('solution-js-btn')) {
            const type = e.target.getAttribute('data-type');
            const challenge = e.target.getAttribute('data-challenge');
            showJsSolution(type, challenge);
        }
    });

    // Botões dos jogos antigos
    ['show-code-1', 'show-code-2', 'show-code-3'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', () => showGameCode(index + 1));
        }
    });
}

function startGame(gameId) {
    currentGameId = gameId;
    document.getElementById('modules').style.display = 'none';
    document.getElementById('games').style.display = 'block';
    
    // Esconder todos os jogos
    document.querySelectorAll('.game-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Mostrar o jogo selecionado
    const currentGame = document.getElementById(`game-${gameId}-container`);
    if (currentGame) {
        currentGame.style.display = 'block';
    }
    
    // Atualizar título
    const game = gamesData.find(g => g.id == gameId);
    document.getElementById('current-game-title').textContent = game ? game.name : 'Jogo';
    
    // Esconder dica
    document.getElementById('hint-container').classList.remove('show');
}

// Jogos básicos
function initGames() {
    initShoppingList();
    initCalculator();
    initLights();
}

function initShoppingList() {
    let shoppingList = [];
    
    document.getElementById('add-item').addEventListener('click', function() {
        const itemInput = document.getElementById('item-input');
        const item = itemInput.value.trim();
        if (item) {
            shoppingList.push(item);
            updateShoppingListDisplay();
            itemInput.value = '';
            if (shoppingList.length >= 3) markGameCompleted(1);
        }
    });
    
    document.getElementById('clear-list').addEventListener('click', function() {
        shoppingList = [];
        updateShoppingListDisplay();
    });
    
    function updateShoppingListDisplay() {
        const list = document.getElementById('shopping-list');
        list.innerHTML = shoppingList.length ? 
            shoppingList.map((item, index) => `
                <div class="shopping-item">
                    <span>${index + 1}. ${item}</span>
                    <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">×</button>
                </div>
            `).join('') :
            '<p class="text-muted text-center">Sua lista está vazia.</p>';
            
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                shoppingList.splice(parseInt(this.getAttribute('data-index')), 1);
                updateShoppingListDisplay();
            });
        });
    }
}

function initCalculator() {
    let operationsCompleted = 0;
    
    document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const op = this.getAttribute('data-op');
            const num1 = parseFloat(document.getElementById('num1').value) || 0;
            const num2 = parseFloat(document.getElementById('num2').value) || 0;
            let result;
            
            switch (op) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : 'Erro: Divisão por zero'; break;
            }
            
            document.getElementById('calc-result').textContent = result;
            if (++operationsCompleted >= 3) markGameCompleted(2);
        });
    });
}

function initLights() {
    let lights = { 'sala-de-estar': 'on', 'quarto': 'off', 'cozinha': 'auto' };
    let interactions = 0;
    
    document.querySelectorAll('.light-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const room = this.getAttribute('data-room');
            const state = this.getAttribute('data-state');
            lights[room] = state;
            updateLightDisplay(room);
            if (++interactions >= 5) markGameCompleted(3);
        });
    });
    
    function updateLightDisplay(room) {
        const el = document.getElementById(`${room}-light`);
        el.className = `light-bulb ${lights[room]}`;
        if (lights[room] === 'auto') {
            const isNight = new Date().getHours() >= 18 || new Date().getHours() <= 6;
            el.textContent = isNight ? '💡 (Noite - Acesa)' : '💡 (Dia - Apagada)';
        }
    }
    
    Object.keys(lights).forEach(updateLightDisplay);
}

// Jogos CSS
function testCssCode(type, challengeId) {
    const codeInput = document.getElementById(`${type}-code-${challengeId}`);
    const preview = document.getElementById(`${type}-preview-${challengeId}`);
    const feedback = document.getElementById(`${type}-feedback-${challengeId}`);
    
    if (!codeInput || !preview || !feedback) return;

    const code = codeInput.value;
    
    // Aplicar CSS
    if (type === 'design' && challengeId === '2') {
        const button = preview.querySelector('button');
        if (button) button.style = code;
    } else {
        preview.style = code;
    }

    // Verificar resultado
    let isCorrect = false;
    let message = '';
    const c = getComputedStyle(preview);

    const checks = {
        color: {
            1: () => c.color === 'rgb(255, 0, 0)',
            2: () => c.backgroundColor === 'rgb(173, 216, 230)',
            3: () => c.color === 'rgb(255, 255, 255)' && c.backgroundColor === 'rgb(0, 128, 0)'
        },
        font: {
            1: () => c.fontSize === '24px',
            2: () => c.fontFamily.toLowerCase().includes('arial'),
            3: () => (c.fontWeight === '700' || c.fontWeight === 'bold') && c.fontStyle === 'italic'
        },
        basic: {
            1: () => c.backgroundColor === 'rgb(0, 0, 255)',
            2: () => c.color === 'rgb(255, 0, 0)',
            3: () => c.textAlign === 'center'
        },
        design: {
            1: () => true,
            2: () => true
        }
    };

    if (checks[type] && checks[type][challengeId]) {
        isCorrect = checks[type][challengeId]();
    }

    const messages = {
        color: {
            1: ['✅ Texto vermelho!', '❌ Use color: red;'],
            2: ['✅ Fundo azul claro!', '❌ Use background-color: lightblue;'],
            3: ['✅ Texto branco em fundo verde!', '❌ Use color: white; background-color: green;']
        },
        font: {
            1: ['✅ Tamanho correto!', '❌ Use font-size: 24px;'],
            2: ['✅ Fonte Arial!', '❌ Use font-family: Arial;'],
            3: ['✅ Negrito e itálico!', '❌ Use font-weight: bold; font-style: italic;']
        },
        basic: {
            1: ['✅ Fundo azul!', '❌ Use background-color: blue;'],
            2: ['✅ Texto vermelho!', '❌ Use color: red;'],
            3: ['✅ Texto centralizado!', '❌ Use text-align: center;']
        },
        design: {
            1: ['✅ Design incrível!', '❌ Continue tentando!'],
            2: ['✅ Botão moderno!', '❌ Continue tentando!']
        }
    };

    message = isCorrect ? 
        messages[type][challengeId][0] : 
        messages[type][challengeId][1];

    feedback.innerHTML = `<div class="${isCorrect ? 'feedback-success' : 'feedback-error'}">${message}</div>`;
    
    if (isCorrect) {
        preview.classList.add('success-pulse');
        setTimeout(() => preview.classList.remove('success-pulse'), 500);
        
        // Marcar como completo se for o último desafio
        if ((type === 'color' && challengeId === '3') || 
            (type === 'font' && challengeId === '3') || 
            (type === 'design' && challengeId === '2')) {
            const gameId = type === 'color' ? 7 : type === 'font' ? 8 : 9;
            markGameCompleted(gameId);
        }
    }
}

function showCssSolution(type, challengeId) {
    const solutions = {
        basic: {
            1: 'background-color: blue;',
            2: 'color: red;',
            3: 'text-align: center;'
        },
        color: {
            1: 'color: red;',
            2: 'background-color: lightblue;',
            3: 'color: white; background-color: green;'
        },
        font: {
            1: 'font-size: 24px;',
            2: 'font-family: Arial;',
            3: 'font-weight: bold; font-style: italic;'
        },
        design: {
            1: 'background-color: blue; color: white; padding: 20px; border-radius: 10px; font-family: Arial;',
            2: 'background: lightblue; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: bold;'
        }
    };
    
    const codeInput = document.getElementById(`${type}-code-${challengeId}`);
    if (codeInput && solutions[type] && solutions[type][challengeId]) {
        codeInput.value = solutions[type][challengeId];
        testCssCode(type, challengeId);
    }
}

// Jogos JavaScript
function testJsCode(type, challengeId) {
    const codeInput = document.getElementById(`js-code-${challengeId}`);
    const resultElement = document.getElementById(`js-result-${challengeId}`);
    const feedback = document.getElementById(`js-feedback-${challengeId}`);
    
    if (!codeInput || !resultElement || !feedback) return;

    const code = codeInput.value;
    let consoleOutput = [];
    
    try {
        const originalLog = console.log;
        console.log = (...args) => consoleOutput.push(args.join(' '));
        eval(code);
        console.log = originalLog;
        
        resultElement.innerHTML = consoleOutput.join('<br>') || '(Nenhuma saída)';
        
        let isCorrect = false;
        let message = '';
        
        const checks = {
            var: {
                1: () => code.includes('let idade') && code.includes('25'),
                2: () => code.includes('let nome') && consoleOutput.some(o => o.includes('Olá')),
                3: () => consoleOutput.some(o => o.includes('30')) || (code.includes('preco') && code.includes('quantidade'))
            },
            function: {
                4: () => code.includes('function') && consoleOutput.some(o => o.includes('Bom dia')),
                5: () => code.includes('function') && code.includes('(') && consoleOutput.some(o => o.includes('Olá')),
                6: () => code.includes('function') && code.includes('return') && consoleOutput.some(o => o.includes('15'))
            }
        };

        if (checks[type] && checks[type][challengeId]) {
            isCorrect = checks[type][challengeId]();
        }

        message = isCorrect ? 
            '✅ Código correto! Parabéns!' : 
            '❌ Continue tentando! Verifique o código.';

        feedback.innerHTML = `<div class="${isCorrect ? 'feedback-success' : 'feedback-error'}">${message}</div>`;
        
        if (isCorrect) {
            if ((type === 'var' && challengeId === '3') || (type === 'function' && challengeId === '6')) {
                const gameId = type === 'var' ? 5 : 6;
                markGameCompleted(gameId);
            }
        }
        
    } catch (error) {
        resultElement.innerHTML = `<span class="text-danger">Erro: ${error.message}</span>`;
        feedback.innerHTML = '<div class="feedback-error">❌ Erro no código. Verifique a sintaxe.</div>';
    }
}

function showJsSolution(type, challengeId) {
    const solutions = {
        var: {
            1: 'let idade = 25;\nconsole.log(idade);',
            2: 'let nome = "Maria";\nconsole.log("Olá, " + nome + "!");',
            3: 'let preco = 10;\nlet quantidade = 3;\nlet total = preco * quantidade;\nconsole.log("Total: R$ " + total);'
        },
        function: {
            4: 'function bomDia() {\n  console.log("Bom dia!");\n}\n\nbomDia();',
            5: 'function cumprimentar(nome) {\n  console.log("Olá, " + nome + "!");\n}\n\ncumprimentar("Maria");',
            6: 'function calcularArea(largura, altura) {\n  return largura * altura;\n}\n\nconsole.log("Área: " + calcularArea(5, 3));'
        }
    };
    
    const codeInput = document.getElementById(`js-code-${challengeId}`);
    if (codeInput && solutions[type] && solutions[type][challengeId]) {
        codeInput.value = solutions[type][challengeId];
        testJsCode(type, challengeId);
    }
}

// Funções auxiliares
function showGameCode(gameId) {
    const codes = {
        1: 'let lista = [];\nlista.push("arroz");\nlista.push("feijão");\nconsole.log(lista);',
        2: 'let n1 = 10, n2 = 5;\nconsole.log("Soma:", n1 + n2);',
        3: 'let escuro = true;\nif(escuro) console.log("Acender"); else console.log("Apagar");'
    };
    alert(`Código do Jogo ${gameId}:\n\n${codes[gameId]}`);
}

console.log('Extensionias I - Sistema carregado com sucesso!');
