// JavaScript para a aplicação
// Sistema de gamificação e progressão
let userXP = 125;
let userLevel = 1;
let currentModule = 1;
let completedChallenges = {
    module1: [false, false],
    module2: [false, false],
    module3: [false, false]
};

// Elementos do DOM
const progressBar = document.getElementById('progress-bar');
const userLevelElement = document.getElementById('user-level');
const pointsBadge = document.getElementById('points-badge');
const congratulationsModal = new bootstrap.Modal(document.getElementById('congratulationsModal'));

// Inicializar a aplicação
function initApp() {
    updateUserData();
    setupEventListeners();
    unlockModule(1); // Desbloquear o primeiro módulo inicialmente
}

// Configurar event listeners
function setupEventListeners() {
    // Botões de verificação de desafio
    document.querySelectorAll('.check-challenge').forEach(button => {
        button.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            const challenge = this.getAttribute('data-challenge');
            checkChallenge(module, challenge);
        });
    });
    
    // Botões de visualização
    document.querySelectorAll('.preview-html').forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            previewHtml(challenge);
        });
    });
    
    // Botões de mostrar solução
    document.querySelectorAll('.show-solution').forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            toggleSolution(challenge);
        });
    });
    
    // Botões de completar módulo
    document.getElementById('complete-module-1').addEventListener('click', function() {
        completeModule(1);
    });
    
    document.getElementById('complete-module-2').addEventListener('click', function() {
        completeModule(2);
    });

    document.getElementById('complete-module-3').addEventListener('click', function() {
        completeModule(3);
    });
    
    // Aplicar CSS em tempo real
    document.querySelectorAll('.css-editor').forEach(editor => {
        editor.addEventListener('input', function() {
            const challenge = this.getAttribute('data-challenge');
            const code = this.value;
            
            // Verificar se o usuário está usando português
            checkForPortuguese(code, challenge);
            
            // Aplicar o CSS (tanto em português quanto em inglês)
            applyCss(translatePortugueseToEnglish(code), challenge);
        });
    });
}

// Verificar se o código contém português e mostrar aviso
function checkForPortuguese(code, challenge) {
    const alertElement = document.getElementById(`language-alert-${challenge}`);
    if (!alertElement) return;
    
    const portugueseKeywords = ['cor:', 'vermelho', 'fundo:', 'azulclaro', 'azul-claro'];
    const hasPortuguese = portugueseKeywords.some(keyword => code.toLowerCase().includes(keyword));
    
    if (hasPortuguese) {
        alertElement.style.display = 'block';
    } else {
        alertElement.style.display = 'none';
    }
}

// Traduzir termos em português para inglês
function translatePortugueseToEnglish(code) {
    let translated = code;
    
    // Traduzir propriedades e valores
    const translations = {
        'cor:': 'color:',
        'fundo:': 'background-color:',
        'vermelho': 'red',
        'azulclaro': 'lightblue',
        'azul-claro': 'lightblue'
    };
    
    for (const [pt, en] of Object.entries(translations)) {
        translated = translated.replace(new RegExp(pt, 'gi'), en);
    }
    
    return translated;
}

// Atualizar a interface com os dados do usuário
function updateUserData() {
    userLevelElement.textContent = userLevel;
    pointsBadge.textContent = userXP + ' XP';
    
    // Atualizar barra de progresso (simplificado)
    const progressPercentage = (userXP % 100);
    progressBar.style.width = progressPercentage + '%';
}

// Verificar um desafio
function checkChallenge(module, challenge) {
    let isCorrect = false;
    const feedbackElement = document.getElementById(`challenge-${challenge}-feedback`);
    
    if (module === '1') {
        if (challenge === '1') {
            // Verificar se criou um parágrafo (qualquer texto dentro de <p></p>)
            const editor = document.querySelector('.html-editor[data-challenge="1"]');
            isCorrect = editor.value.includes('<p>') && editor.value.includes('</p>');
        } else if (challenge === '2') {
            // Verificar se criou um título h1 (qualquer texto dentro de <h1></h1>)
            const editor = document.querySelector('.html-editor[data-challenge="2"]');
            isCorrect = editor.value.includes('<h1>') && editor.value.includes('</h1>');
        }
    } else if (module === '2') {
        if (challenge === '1') {
            // Verificar se a cor do texto é vermelha (aceita tanto português quanto inglês)
            const textElement = document.getElementById('text-to-style');
            const computedStyle = window.getComputedStyle(textElement);
            isCorrect = computedStyle.color === 'rgb(255, 0, 0)';
        } else if (challenge === '2') {
            // Verificar se a cor de fundo do body é azul claro (lightblue) - aceita tanto português quanto inglês
            const bodyElement = document.body;
            const computedStyle = window.getComputedStyle(bodyElement);
            isCorrect = computedStyle.backgroundColor === 'rgb(173, 216, 230)'; // lightblue em RGB
        }
    } else if (module === '3') {
        if (challenge === '1') {
            // Verificar se a caixa está centralizada
            const boxElement = document.getElementById('box-to-center');
            const computedStyle = window.getComputedStyle(boxElement);
            isCorrect = computedStyle.marginLeft === 'auto' && computedStyle.marginRight === 'auto';
        } else if (challenge === '2') {
            // Verificar se o contêiner é um flexbox
            const flexContainer = document.getElementById('flex-container');
            const computedStyle = window.getComputedStyle(flexContainer);
            isCorrect = computedStyle.display === 'flex';
        }
    }
    
    if (isCorrect) {
        feedbackElement.innerHTML = '<span class="feedback-success"><i class="bi bi-check-circle-fill"></i> Parabéns! Você completou o desafio!</span>';
        completedChallenges[`module${module}`][challenge-1] = true;
        
        // Atualizar progresso do módulo
        updateModuleProgress(module);
        
        // Dar XP
        userXP += 25;
        updateUserData();
    } else {
        feedbackElement.innerHTML = '<span class="feedback-error"><i class="bi bi-exclamation-circle-fill"></i> Ainda não está correto. Continue tentando!</span>';
    }
}

// Visualizar HTML
function previewHtml(challenge) {
    const editor = document.querySelector(`.html-editor[data-challenge="${challenge}"]`);
    const previewArea = document.getElementById(`html-preview-${challenge}`);
    previewArea.innerHTML = editor.value;
}

// Aplicar CSS
function applyCss(cssCode, challenge) {
    let styleElement = document.getElementById(`dynamic-style-${challenge}`);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = `dynamic-style-${challenge}`;
        document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = cssCode;
}

// Mostrar/ocultar solução
function toggleSolution(challenge) {
    const solutionContainer = document.getElementById(`solution-${challenge}`);
    const button = document.querySelector(`.show-solution[data-challenge="${challenge}"]`);
    
    if (solutionContainer.style.display === 'block') {
        solutionContainer.style.display = 'none';
        button.textContent = 'Mostrar Solução';
    } else {
        solutionContainer.style.display = 'block';
        button.textContent = 'Ocultar Solução';
        
        // Preencher o editor com a solução
        if (challenge === '3') {
            const editor = document.querySelector('.css-editor[data-challenge="1"]');
            editor.value = '#text-to-style {\n    color: red;\n}';
            applyCss('#text-to-style { color: red; }', '1');
        } else if (challenge === '4') {
            const editor = document.querySelector('.css-editor[data-challenge="2"]');
            editor.value = 'body {\n    background-color: lightblue;\n}';
            applyCss('body { background-color: lightblue; }', '2');
        } else if (challenge === '5') {
            const editor = document.querySelector('.css-editor[data-challenge="3"]');
            editor.value = '#box-to-center {\n    margin: 0 auto;\n    width: 50%;\n}';
            applyCss('#box-to-center { margin: 0 auto; width: 50%; }', '3');
        } else if (challenge === '6') {
            const editor = document.querySelector('.css-editor[data-challenge="4"]');
            editor.value = '#flex-container {\n    display: flex;\n}';
            applyCss('#flex-container { display: flex; }', '4');
        }
    }
}

// Atualizar progresso do módulo
function updateModuleProgress(module) {
    const challenges = completedChallenges[`module${module}`];
    const completedCount = challenges.filter(c => c).length;
    const totalCount = challenges.length;
    const progressPercentage = (completedCount / totalCount) * 100;
    
    document.getElementById(`module-${module}-progress`).style.width = `${progressPercentage}%`;
    
    // Se todos os desafios estão completos, habilitar o botão de completar módulo
    if (completedCount === totalCount) {
        document.getElementById(`complete-module-${module}`).disabled = false;
    }
}

// Completar um módulo
function completeModule(module) {
    // Dar XP bônus por completar o módulo
    userXP += 50;
    updateUserData();
    
    // Marcar módulo como concluído
    const moduleElement = document.getElementById(`module-${module}`);
    moduleElement.querySelector('.locked-badge').style.display = 'none';
    moduleElement.querySelector('.completed-checkmark').style.display = 'block';
    moduleElement.classList.remove('locked');
    
    // Atualizar UI
    document.getElementById(`module-${module}-progress`).style.width = '100%';
    
    // Mostrar modal de parabéns
    document.getElementById('xp-earned').textContent = '50';
    congratulationsModal.show();
    
    // Desbloquear próximo módulo
    if (module < 3) {
        unlockModule(module + 1);
    }
    
    // Esconder desafios do módulo atual e mostrar do próximo
    if (module === 1) {
        document.getElementById('module-1-challenges').style.display = 'none';
        document.getElementById('module-2-challenges').style.display = 'block';
    } else if (module === 2) {
        document.getElementById('module-2-challenges').style.display = 'none';
        document.getElementById('module-3-challenges').style.display = 'block';
    } else if (module === 3) {
        document.getElementById('module-3-challenges').style.display = 'none';
        // Todos os módulos concluídos
    }
}

// Desbloquear um módulo
function unlockModule(module) {
    const moduleElement = document.getElementById(`module-${module}`);
    moduleElement.classList.remove('locked');
    moduleElement.querySelector('.locked-badge').style.display = 'none';
    
    const button = moduleElement.querySelector('.start-module');
    button.disabled = false;
    button.classList.remove('btn-outline-secondary');
    button.classList.add('btn-outline-primary');
    button.textContent = 'Iniciar Módulo';
    
    // Configurar evento de clique para iniciar módulo
    button.addEventListener('click', function() {
        // Esconder todos os desafios primeiro
        document.querySelectorAll('.module-challenges').forEach(el => {
            el.style.display = 'none';
        });
        
        // Mostrar desafios do módulo selecionado
        document.getElementById(`module-${module}-challenges`).style.display = 'block';
        
        // Scroll para a seção de desafios
        document.getElementById('challenges').scrollIntoView({ behavior: 'smooth' });
    });
}

// Inicializar a aplicação quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', initApp);