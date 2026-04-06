/* ============================================
   FITLIFE - SISTEMA DE SCRIPTS PRINCIPAL
   Desenvolvido com JavaScript Vanilla
   Utiliza: let, const, console.log, alert
   ============================================ */

// ============================================
// 1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ============================================

// Configuração do tema
let temaAtual = localStorage.getItem('tema') || 'claro';

// Dados do usuário (armazenados localmente para demonstração)
let dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || {
    nome: '',
    peso: 0,
    altura: 0,
    idade: 0,
    sexo: '',
    nivelAtividade: '',
    objetivo: '',
    imc: 0,
    pesoIdeal: 0,
    planoSelecionado: ''
};

// Constantes para cálculos
const CLASSIFICACAO_IMC = {
    magreza: { min: 0, max: 18.5, texto: 'Abaixo do Peso', cor: '#f59e0b' },
    normal: { min: 18.5, max: 24.9, texto: 'Peso Normal', cor: '#22c55e' },
    sobrepeso: { min: 25, max: 29.9, texto: 'Sobrepeso', cor: '#f59e0b' },
    obesidade1: { min: 30, max: 34.9, texto: 'Obesidade Grau I', cor: '#ef4444' },
    obesidade2: { min: 35, max: 39.9, texto: 'Obesidade Grau II', cor: '#dc2626' },
    obesidade3: { min: 40, max: 100, texto: 'Obesidade Grau III', cor: '#991b1b' }
};

// ============================================
// 2. FUNÇÕES DE INICIALIZAÇÃO
// ============================================

/**
 * Inicializa a aplicação quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('[FitLife] Aplicação iniciada');
    
    // Aplicar tema salvo
    aplicarTema(temaAtual);
    
    // Inicializar componentes
    inicializarNavegacao();
    inicializarCalculadora();
    inicializarPlanos();
    inicializarTema();
    inicializarAnimacoes();
    inicializarFormularios();
    
    // Log de debug
    console.log('[FitLife] Dados do usuário carregados:', dadosUsuario);
});

// ============================================
// 3. SISTEMA DE TEMA (CLARO/ESCURO)
// ============================================

/**
 * Aplica o tema selecionado
 * @param {string} tema - 'claro' ou 'escuro'
 */
function aplicarTema(tema) {
    let body = document.body;
    
    if (tema === 'escuro') {
        body.setAttribute('data-tema', 'escuro');
        console.log('[FitLife] Tema escuro aplicado');
    } else {
        body.removeAttribute('data-tema');
        console.log('[FitLife] Tema claro aplicado');
    }
    
    // Salvar preferência
    localStorage.setItem('tema', tema);
    temaAtual = tema;
    
    // Atualizar botão de tema
    atualizarBotaoTema();
}

/**
 * Alterna entre tema claro e escuro
 */
function alternarTema() {
    let novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
    aplicarTema(novoTema);
    
    // Mostrar notificação
    mostrarNotificacao(`Tema ${novoTema} ativado!`, 'sucesso');
    
    console.log('[FitLife] Tema alterado para:', novoTema);
}

/**
 * Atualiza o texto e ícone do botão de tema
 */
function atualizarBotaoTema() {
    let btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        let icone = temaAtual === 'claro' ? '🌙' : '☀️';
        let texto = temaAtual === 'claro' ? 'Modo Escuro' : 'Modo Claro';
        btnTema.innerHTML = `<span class="icone">${icone}</span> ${texto}`;
    }
}

/**
 * Inicializa o botão de tema
 */
function inicializarTema() {
    let btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', alternarTema);
        atualizarBotaoTema();
    }
}

// ============================================
// 4. NAVEGAÇÃO
// ============================================

/**
 * Inicializa a navegação do site
 */
function inicializarNavegacao() {
    let menuToggle = document.querySelector('.menu-toggle');
    let navLista = document.querySelector('.nav-lista');
    let cabecalho = document.querySelector('.cabecalho');
    
    // Toggle do menu mobile
    if (menuToggle && navLista) {
        menuToggle.addEventListener('click', function() {
            navLista.classList.toggle('aberto');
            console.log('[FitLife] Menu mobile toggled');
        });
        
        // Fechar menu ao clicar em um link
        let navLinks = navLista.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navLista.classList.remove('aberto');
            });
        });
    }
    
    // Efeito de scroll no cabeçalho
    if (cabecalho) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                cabecalho.classList.add('scrolled');
            } else {
                cabecalho.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            let href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                let target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    console.log('[FitLife] Navegação inicializada');
}

// ============================================
// 5. CALCULADORA DE IMC
// ============================================

/**
 * Inicializa a calculadora de IMC
 */
function inicializarCalculadora() {
    let formCalculadora = document.getElementById('form-calculadora');
    
    if (formCalculadora) {
        formCalculadora.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularIMC();
        });
        
        // Validação em tempo real
        let inputs = formCalculadora.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                validarCampo(this);
            });
        });
    }
    
    console.log('[FitLife] Calculadora inicializada');
}

/**
 * Calcula o IMC e exibe o resultado
 */
function calcularIMC() {
    // Obter valores do formulário
    let nome = document.getElementById('nome')?.value.trim() || '';
    let peso = parseFloat(document.getElementById('peso')?.value) || 0;
    let altura = parseFloat(document.getElementById('altura')?.value) || 0;
    let idade = parseInt(document.getElementById('idade')?.value) || 0;
    let sexo = document.getElementById('sexo')?.value || '';
    
    console.log('[FitLife] Calculando IMC para:', { nome, peso, altura, idade, sexo });
    
    // Validações
    if (!nome) {
        alert('Por favor, digite seu nome para personalizar sua experiência!');
        return;
    }
    
    if (peso <= 0 || peso > 500) {
        alert('Por favor, insira um peso válido (entre 1 e 500 kg).');
        return;
    }
    
    if (altura <= 0 || altura > 3) {
        alert('Por favor, insira uma altura válida em metros (ex: 1.75).');
        return;
    }
    
    if (idade <= 0 || idade > 120) {
        alert('Por favor, insira uma idade válida.');
        return;
    }
    
    if (!sexo) {
        alert('Por favor, selecione seu sexo biológico para cálculos precisos.');
        return;
    }
    
    // Calcular IMC
    let imc = peso / (altura * altura);
    imc = Math.round(imc * 10) / 10;
    
    // Calcular peso ideal (Fórmula de Lorentz)
    let pesoIdeal;
    if (sexo === 'masculino') {
        pesoIdeal = altura * 100 - 100 - ((altura * 100 - 150) / 4);
    } else {
        pesoIdeal = altura * 100 - 100 - ((altura * 100 - 150) / 2.5);
    }
    pesoIdeal = Math.round(pesoIdeal * 10) / 10;
    
    // Obter classificação
    let classificacao = obterClassificacaoIMC(imc);
    
    // Calcular diferença de peso
    let diferencaPeso = Math.round((peso - pesoIdeal) * 10) / 10;
    
    // Atualizar dados do usuário
    dadosUsuario = {
        ...dadosUsuario,
        nome: nome,
        peso: peso,
        altura: altura,
        idade: idade,
        sexo: sexo,
        imc: imc,
        pesoIdeal: pesoIdeal,
        diferencaPeso: diferencaPeso,
        classificacao: classificacao
    };
    
    // Salvar dados
    localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));
    
    console.log('[FitLife] IMC calculado:', imc);
    console.log('[FitLife] Peso ideal:', pesoIdeal);
    console.log('[FitLife] Classificação:', classificacao.texto);
    
    // Exibir resultado
    exibirResultadoIMC(imc, classificacao, pesoIdeal, diferencaPeso, nome);
    
    // Mostrar seção de planos
    mostrarSecaoPlanos();
}

/**
 * Obtém a classificação do IMC
 * @param {number} imc - Valor do IMC
 * @returns {object} Classificação do IMC
 */
function obterClassificacaoIMC(imc) {
    for (let chave in CLASSIFICACAO_IMC) {
        let classe = CLASSIFICACAO_IMC[chave];
        if (imc >= classe.min && imc < classe.max) {
            return classe;
        }
    }
    return CLASSIFICACAO_IMC.obesidade3;
}

/**
 * Exibe o resultado do IMC na tela
 */
function exibirResultadoIMC(imc, classificacao, pesoIdeal, diferencaPeso, nome) {
    let resultadoDiv = document.getElementById('resultado-imc');
    
    if (resultadoDiv) {
        // Mensagem personalizada
        let mensagem = gerarMensagemPersonalizada(classificacao, diferencaPeso, nome);
        
        // Calcular porcentagem para a barra (0-40 IMC = 0-100%)
        let porcentagemBarra = Math.min((imc / 40) * 100, 100);
        
        resultadoDiv.innerHTML = `
            <div class="resultado-valor">${imc}</div>
            <div class="resultado-classificacao">${classificacao.texto}</div>
            <div class="resultado-mensagem">
                <p><strong>${nome}</strong>, ${mensagem}</p>
                <p style="margin-top: 1rem;">
                    <strong>Seu peso ideal:</strong> ${pesoIdeal} kg<br>
                    <strong>Diferença:</strong> ${diferencaPeso > 0 ? '+' : ''}${diferencaPeso} kg
                </p>
            </div>
            <div class="imc-barra">
                <div class="imc-barra-preenchimento" style="width: ${porcentagemBarra}%"></div>
            </div>
        `;
        
        resultadoDiv.classList.add('visivel');
        
        // Scroll para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Gera mensagem personalizada baseada no IMC
 */
function gerarMensagemPersonalizada(classificacao, diferencaPeso, nome) {
    let mensagens = {
        'Abaixo do Peso': `você está abaixo do peso ideal. Vamos trabalhar juntos para você ganhar massa de forma saudável! Preparamos planos especiais para você.`,
        'Peso Normal': `parabéns! Você está no peso ideal! Agora vamos manter e melhorar ainda mais sua saúde com nossos planos de manutenção.`,
        'Sobrepeso': `você está um pouco acima do peso ideal. Não se preocupe, com dedicação você vai alcançar seus objetivos! Temos planos perfeitos para você.`,
        'Obesidade Grau I': `é hora de cuidar da sua saúde! Com os planos certos e dedicação, você vai conseguir transformar sua vida. Estamos aqui para ajudar!`,
        'Obesidade Grau II': `sua saúde precisa de atenção especial. Recomendamos acompanhamento médico junto com nossos planos. Juntos, vamos conseguir!`,
        'Obesidade Grau III': `é muito importante buscar ajuda médica. Nossos planos podem complementar o tratamento indicado pelo seu médico.`
    };
    
    return mensagens[classificacao.texto] || 'Vamos criar um plano personalizado para você!';
}

/**
 * Mostra a seção de planos após calcular o IMC
 */
function mostrarSecaoPlanos() {
    let secaoPlanos = document.getElementById('secao-planos');
    if (secaoPlanos) {
        secaoPlanos.classList.remove('hidden');
        secaoPlanos.classList.add('animate-fadeInUp');
        
        // Scroll para a seção
        setTimeout(function() {
            secaoPlanos.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    }
}

// ============================================
// 6. SISTEMA DE PLANOS
// ============================================

/**
 * Inicializa os cards de planos
 */
function inicializarPlanos() {
    let planosCards = document.querySelectorAll('.plano-card');
    
    planosCards.forEach(function(card) {
        card.addEventListener('click', function() {
            let planoId = this.getAttribute('data-plano');
            selecionarPlano(planoId);
        });
    });
    
    console.log('[FitLife] Planos inicializados');
}

/**
 * Seleciona um plano e redireciona para a página do plano
 * @param {string} planoId - ID do plano selecionado
 */
function selecionarPlano(planoId) {
    console.log('[FitLife] Plano selecionado:', planoId);
    
    // Verificar se o usuário já calculou o IMC
    if (!dadosUsuario.imc) {
        alert('Por favor, calcule seu IMC primeiro para receber um plano personalizado!');
        document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Salvar plano selecionado
    dadosUsuario.planoSelecionado = planoId;
    localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));
    
    // Mostrar confirmação
    let nomesPLanos = {
        'perda-peso': 'Perda de Peso',
        'ganho-massa': 'Ganho de Massa',
        'manutencao': 'Manutenção',
        'hiit': 'HIIT Intensivo'
    };
    
    let confirmacao = confirm(
        `${dadosUsuario.nome}, você selecionou o plano "${nomesPLanos[planoId]}".\n\n` +
        `Deseja ir para a página com seu plano personalizado?`
    );
    
    if (confirmacao) {
        // Redirecionar para a página do plano
        window.location.href = `plano.html?tipo=${planoId}`;
    }
}

// ============================================
// 7. VALIDAÇÃO DE FORMULÁRIOS
// ============================================

/**
 * Inicializa validação de formulários
 */
function inicializarFormularios() {
    // Validar campos numéricos
    document.querySelectorAll('input[type="number"]').forEach(function(input) {
        input.addEventListener('input', function() {
            // Remover caracteres não numéricos (exceto ponto)
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            // Permitir apenas um ponto decimal
            let partes = this.value.split('.');
            if (partes.length > 2) {
                this.value = partes[0] + '.' + partes.slice(1).join('');
            }
        });
    });
    
    console.log('[FitLife] Formulários inicializados');
}

/**
 * Valida um campo individual
 * @param {HTMLElement} campo - Campo a ser validado
 */
function validarCampo(campo) {
    let valor = campo.value;
    let tipo = campo.type;
    let valido = true;
    
    if (tipo === 'number') {
        let num = parseFloat(valor);
        let min = parseFloat(campo.min) || 0;
        let max = parseFloat(campo.max) || Infinity;
        
        if (isNaN(num) || num < min || num > max) {
            valido = false;
        }
    }
    
    if (tipo === 'text' && campo.required && !valor.trim()) {
        valido = false;
    }
    
    // Adicionar/remover classe de erro
    if (valido) {
        campo.style.borderColor = '';
    } else {
        campo.style.borderColor = 'var(--cor-erro)';
    }
    
    return valido;
}

// ============================================
// 8. SISTEMA DE NOTIFICAÇÕES
// ============================================

/**
 * Mostra uma notificação na tela
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {string} tipo - Tipo: 'sucesso', 'erro', 'alerta'
 */
function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    // Remover notificação existente
    let notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    // Criar nova notificação
    let notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    
    let icones = {
        sucesso: '✓',
        erro: '✕',
        alerta: '!'
    };
    
    notificacao.innerHTML = `
        <span style="font-size: 1.25rem;">${icones[tipo]}</span>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notificacao);
    
    // Mostrar notificação
    setTimeout(function() {
        notificacao.classList.add('visivel');
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(function() {
        notificacao.classList.remove('visivel');
        setTimeout(function() {
            notificacao.remove();
        }, 300);
    }, 3000);
    
    console.log('[FitLife] Notificação:', tipo, mensagem);
}

// ============================================
// 9. ANIMAÇÕES E EFEITOS
// ============================================

/**
 * Inicializa animações de scroll
 */
function inicializarAnimacoes() {
    // Intersection Observer para animações on-scroll
    let observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.plano-card, .esporte-card, .depoimento-card, .info-card').forEach(function(el) {
        observer.observe(el);
    });
    
    console.log('[FitLife] Animações inicializadas');
}

// ============================================
// 10. FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Formata número para exibição
 * @param {number} numero - Número a ser formatado
 * @param {number} decimais - Casas decimais
 */
function formatarNumero(numero, decimais = 1) {
    return numero.toFixed(decimais).replace('.', ',');
}

/**
 * Calcula calorias diárias necessárias (Harris-Benedict)
 * @param {object} dados - Dados do usuário
 */
function calcularCaloriasDiarias(dados) {
    let tmb;
    
    // Taxa Metabólica Basal
    if (dados.sexo === 'masculino') {
        tmb = 88.362 + (13.397 * dados.peso) + (4.799 * dados.altura * 100) - (5.677 * dados.idade);
    } else {
        tmb = 447.593 + (9.247 * dados.peso) + (3.098 * dados.altura * 100) - (4.330 * dados.idade);
    }
    
    // Multiplicador de atividade
    let multiplicadores = {
        sedentario: 1.2,
        leve: 1.375,
        moderado: 1.55,
        intenso: 1.725,
        extremo: 1.9
    };
    
    let multiplicador = multiplicadores[dados.nivelAtividade] || 1.55;
    
    return Math.round(tmb * multiplicador);
}

/**
 * Obtém parâmetro da URL
 * @param {string} nome - Nome do parâmetro
 */
function obterParametroURL(nome) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// ============================================
// 11. EXPORTAÇÃO DE FUNÇÕES GLOBAIS
// ============================================

// Tornar funções acessíveis globalmente
window.calcularIMC = calcularIMC;
window.alternarTema = alternarTema;
window.selecionarPlano = selecionarPlano;
window.mostrarNotificacao = mostrarNotificacao;
window.dadosUsuario = dadosUsuario;
