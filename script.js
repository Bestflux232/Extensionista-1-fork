// Sistema principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Extensionias I - Iniciando...');
    setupEventListeners();
    initGames();
});

function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Botões de iniciar jogo
    document.querySelectorAll('.start-game').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            console.log('Iniciando jogo:', gameId);
            startGame(gameId);
        });
    });

    // Botão de voltar ao menu
    document.getElementById('back-to-menu').addEventListener('click', function() {
        document.getElementById('games').style.display = 'none';
        document.getElementById('modules').style.display = 'block';
    });

    // Botões dos jogos de CSS
    document.querySelectorAll('.test-css-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const challenge = this.getAttribute('data-challenge');
            console.log('Testando CSS:', type, challenge);
            testCssCode(type, challenge);
        });
    });

    document.querySelectorAll('.solution-css-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const challenge = this.getAttribute('data-challenge');
            console.log('Mostrando solução:', type, challenge);
            showCssSolution(type, challenge);
        });
    });

    // Botões de ver código dos jogos antigos
    const showCode1 = document.getElementById('show-code-1');
    const showCode2 = document.getElementById('show-code-2');
    const showCode3 = document.getElementById('show-code-3');
    
    if (showCode1) showCode1.addEventListener('click', showListCode);
    if (showCode2) showCode2.addEventListener('click', showCalculatorCode);
    if (showCode3) showCode3.addEventListener('click', showLightsCode);
}

function startGame(gameId) {
    console.log('Iniciando jogo:', gameId);
    
    // Esconder módulos e mostrar área de jogos
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
    const gameTitles = {
        '1': '📝 Lista de Compras',
        '2': '🧮 Calculadora Simples', 
        '3': '💡 Luzes da Casa',
        '4': '🎨 CSS Básico',
        '5': '📦 Variáveis JavaScript',
        '6': '⚙️ Funções JavaScript',
        '7': '🎨 Cores CSS',
        '8': '🔤 Fontes CSS',
        '9': '💫 Designer CSS'
    };
    
    document.getElementById('current-game-title').textContent = gameTitles[gameId] || 'Jogo';
}

// ========== JOGOS 1-3 (ORIGINAIS) ==========
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
            itemInput.focus();
        }
    });
    
    document.getElementById('clear-list').addEventListener('click', function() {
        shoppingList = [];
        updateShoppingListDisplay();
    });
    
    function updateShoppingListDisplay() {
        const listContainer = document.getElementById('shopping-list');
        listContainer.innerHTML = '';
        
        if (shoppingList.length === 0) {
            listContainer.innerHTML = '<p class="text-muted text-center">Sua lista está vazia. Adicione alguns itens!</p>';
            return;
        }
        
        shoppingList.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'shopping-item';
            itemElement.innerHTML = `
                <span>${index + 1}. ${item}</span>
                <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">×</button>
            `;
            listContainer.appendChild(itemElement);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                shoppingList.splice(index, 1);
                updateShoppingListDisplay();
            });
        });
    }
}

function initCalculator() {
    document.querySelectorAll('.operation-btn').forEach(button => {
        button.addEventListener('click', function() {
            const operation = this.getAttribute('data-op');
            calculate(operation);
        });
    });
    
    function calculate(operation) {
        const num1 = parseFloat(document.getElementById('num1').value) || 0;
        const num2 = parseFloat(document.getElementById('num2').value) || 0;
        let result;
        
        switch(operation) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num2 !== 0 ? num1 / num2 : 'Erro: Divisão por zero'; break;
        }
        
        document.getElementById('calc-result').textContent = result;
    }
}

function initLights() {
    let lights = {
        living: 'on',
        bedroom: 'off', 
        kitchen: 'auto'
    };
    
    document.querySelectorAll('.light-btn').forEach(button => {
        button.addEventListener('click', function() {
            const room = this.getAttribute('data-room');
            const state = this.getAttribute('data-state');
            
            lights[room] = state;
            updateLightDisplay(room);
            
            document.querySelectorAll(`.light-btn[data-room="${room}"]`).forEach(btn => {
                btn.classList.remove('btn-success', 'btn-warning');
                btn.classList.add('btn-outline-secondary');
            });
            this.classList.remove('btn-outline-secondary');
            this.classList.add(state === 'auto' ? 'btn-warning' : 'btn-success');
        });
    });
    
    function updateLightDisplay(room) {
        const lightElement = document.getElementById(`${room}-light`);
        lightElement.className = 'light-bulb ' + lights[room];
        
        if (lights[room] === 'auto') {
            const isNight = new Date().getHours() >= 18 || new Date().getHours() <= 6;
            lightElement.textContent = isNight ? '💡 (Noite - Acesa)' : '💡 (Dia - Apagada)';
            lightElement.style.backgroundColor = isNight ? '#fff3cd' : '#6c757d';
        } else {
            lightElement.textContent = '💡';
        }
    }
    
    Object.keys(lights).forEach(room => updateLightDisplay(room));
}

// ========== JOGOS 7-9 (NOVOS CSS) ==========

function testCssCode(type, challengeId) {
    const codeInput = document.getElementById(`${type}-code-${challengeId}`);
    const preview = document.getElementById(`${type}-preview-${challengeId}`);
    const feedback = document.getElementById(`${type}-feedback-${challengeId}`);
    
    if (!codeInput || !preview || !feedback) {
        console.error('Elementos não encontrados:', type, challengeId);
        return;
    }
    
    const code = codeInput.value;
    
    // Aplicar o código CSS
    if (type === 'design' && challengeId === '2') {
        const button = preview.querySelector('button');
        if (button) button.style = code;
    } else {
        preview.style = code;
    }
    
    // Verificar se está correto
    let isCorrect = false;
    let message = '';
    
    if (type === 'color') {
        switch(challengeId) {
            case '1':
                const textColor = getComputedStyle(preview).color;
                isCorrect = textColor === 'rgb(255, 0, 0)';
                message = isCorrect ? 
                    '✅ Correto! Você mudou a cor do texto para vermelho.' : 
                    '❌ Tente usar: color: red;';
                break;
            case '2':
                const bgColor = getComputedStyle(preview).backgroundColor;
                isCorrect = bgColor === 'rgb(173, 216, 230)';
                message = isCorrect ? 
                    '✅ Correto! Você mudou a cor de fundo para azul claro.' : 
                    '❌ Tente usar: background-color: lightblue;';
                break;
            case '3':
                const textColor3 = getComputedStyle(preview).color;
                const bgColor3 = getComputedStyle(preview).backgroundColor;
                isCorrect = textColor3 === 'rgb(255, 255, 255)' && bgColor3 === 'rgb(0, 128, 0)';
                message = isCorrect ? 
                    '✅ Perfeito! Texto branco em fundo verde.' : 
                    '❌ Use: color: white; background-color: green;';
                break;
        }
    } else if (type === 'font') {
        switch(challengeId) {
            case '1':
                const fontSize = getComputedStyle(preview).fontSize;
                isCorrect = fontSize === '24px';
                message = isCorrect ? 
                    '✅ Correto! Você aumentou o tamanho da fonte para 24px.' : 
                    '❌ Tente usar: font-size: 24px;';
                break;
            case '2':
                const fontFamily = getComputedStyle(preview).fontFamily.toLowerCase();
                isCorrect = fontFamily.includes('arial');
                message = isCorrect ? 
                    '✅ Correto! Você mudou a fonte para Arial.' : 
                    '❌ Tente usar: font-family: Arial;';
                break;
            case '3':
                const fontWeight = getComputedStyle(preview).fontWeight;
                const fontStyle = getComputedStyle(preview).fontStyle;
                isCorrect = (fontWeight === '700' || fontWeight === 'bold') && fontStyle === 'italic';
                message = isCorrect ? 
                    '✅ Excelente! Texto em negrito e itálico.' : 
                    '❌ Use: font-weight: bold; font-style: italic;';
                break;
        }
    } else if (type === 'design') {
        // Critérios mais flexíveis para design
        isCorrect = true;
        message = '✅ Ótimo trabalho! Seu design está ficando incrível.';
    }
    
    // Mostrar feedback
    feedback.innerHTML = `<div class="${isCorrect ? 'feedback-success' : 'feedback-error'}">${message}</div>`;
    
    // Animar se correto
    if (isCorrect) {
        preview.classList.add('success-pulse');
        setTimeout(() => preview.classList.remove('success-pulse'), 500);
    }
}

function showCssSolution(type, challengeId) {
    const solutions = {
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
            1: 'background-color: #2c3e50; color: white; padding: 20px; border-radius: 10px; font-family: Arial;',
            2: 'background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);'
        }
    };
    
    const codeInput = document.getElementById(`${type}-code-${challengeId}`);
    if (codeInput && solutions[type] && solutions[type][challengeId]) {
        codeInput.value = solutions[type][challengeId];
        testCssCode(type, challengeId);
    }
}

// Funções auxiliares dos jogos antigos
function showListCode() {
    alert(`📋 CÓDIGO DA LISTA DE COMPRAS:\n\nlet listaCompras = [];\nlistaCompras.push("arroz");\nlistaCompras.push("feijão");\nconsole.log(listaCompras);`);
}

function showCalculatorCode() {
    alert(`🧮 CÓDIGO DA CALCULADORA:\n\nlet numero1 = 10;\nlet numero2 = 5;\nlet soma = numero1 + numero2;\nconsole.log("Soma: " + soma);`);
}

function showLightsCode() {
    alert(`💡 CÓDIGO DAS LUZES:\n\nlet estaEscuro = true;\nif (estaEscuro) {\n  console.log("Acender a luz");\n} else {\n  console.log("Apagar a luz");\n}`);
}

console.log('Extensionias I - Todos os jogos carregados!');