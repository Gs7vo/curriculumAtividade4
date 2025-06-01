// Aguardar o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas as funcionalidades
  inicializarMenuNavegacao();
  inicializarBotaoTopo();
  inicializarExpandirResumo();
  inicializarTabs();
  inicializarFiltroExperiencia();
  inicializarCarrosselProjetos();
  inicializarBarrasProgresso();
  inicializarFormularioContato();
});

/**
 * Menu de Navegação Responsivo
 * Controla a exibição do menu de navegação em dispositivos móveis
 */
function inicializarMenuNavegacao() {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNavegacao = document.getElementById("menu-navegacao");
  const linksNavegacao = document.querySelectorAll(".link-navegacao");

  // Alternar visibilidade do menu ao clicar no botão
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuNavegacao.classList.toggle("aberto");
      menuToggle.classList.toggle("ativo");

      // Alterar ícone do botão
      const icone = menuToggle.querySelector("i");
      if (icone.classList.contains("fa-bars")) {
        icone.classList.remove("fa-bars");
        icone.classList.add("fa-times");
      } else {
        icone.classList.remove("fa-times");
        icone.classList.add("fa-bars");
      }
    });
  }

  // Fechar menu ao clicar em um link
  linksNavegacao.forEach((link) => {
    link.addEventListener("click", function () {
      menuNavegacao.classList.remove("aberto");
      if (menuToggle) {
        menuToggle.classList.remove("ativo");
        const icone = menuToggle.querySelector("i");
        icone.classList.remove("fa-times");
        icone.classList.add("fa-bars");
      }
    });
  });

  // Adicionar rolagem suave aos links de navegação
  linksNavegacao.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calcular posição do elemento alvo
        const offsetTop = targetElement.offsetTop;

        // Rolar suavemente até o elemento
        window.scrollTo({
          top: offsetTop - 20, // Pequeno offset para melhor visualização
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Botão Voltar ao Topo
 * Exibe um botão para retornar ao topo da página quando o usuário rolar para baixo
 */
function inicializarBotaoTopo() {
  const btnTopo = document.getElementById("btn-topo");

  // Mostrar/ocultar botão com base na posição de rolagem
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      // Mostrar após rolar 300px
      btnTopo.classList.add("visivel");
    } else {
      btnTopo.classList.remove("visivel");
    }
  });

  // Rolar para o topo ao clicar no botão
  if (btnTopo) {
    btnTopo.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * Expandir/Recolher Resumo
 * Permite mostrar ou ocultar informações adicionais na seção de resumo
 */
function inicializarExpandirResumo() {
  const btnExpandir = document.getElementById("btn-expandir-resumo");
  const btnReduzir = document.getElementById("btn-reduzir-resumo");
  const resumoExpandido = document.getElementById("resumo-expandido");

  if (btnExpandir && btnReduzir && resumoExpandido) {
    btnExpandir.addEventListener("click", function () {
      resumoExpandido.classList.remove("escondido");
      btnExpandir.classList.add("escondido");
      btnReduzir.classList.remove("escondido");
    });

    btnReduzir.addEventListener("click", function () {
      resumoExpandido.classList.add("escondido");
      btnReduzir.classList.add("escondido");
      btnExpandir.classList.remove("escondido");
    });
  }
}

/**
 * Sistema de Tabs para Habilidades
 * Permite alternar entre diferentes categorias de habilidades
 */
function inicializarTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover classe ativo de todos os botões e conteúdos
      tabBtns.forEach((b) => b.classList.remove("ativo"));
      tabContents.forEach((c) => c.classList.remove("ativo"));

      // Adicionar classe ativo ao botão clicado
      this.classList.add("ativo");

      // Mostrar conteúdo correspondente
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("ativo");
    });
  });
}

/**
 * Filtro de Experiências
 * Permite filtrar experiências profissionais por categoria
 */
function inicializarFiltroExperiencia() {
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const experiencias = document.querySelectorAll(".item-experiencia");

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover classe ativo de todos os botões
      filtroBtns.forEach((b) => b.classList.remove("ativo"));

      // Adicionar classe ativo ao botão clicado
      this.classList.add("ativo");

      // Filtrar experiências
      const filtro = this.getAttribute("data-filtro");

      experiencias.forEach((exp) => {
        if (filtro === "todos") {
          exp.style.display = "block";
        } else {
          if (exp.getAttribute("data-categoria") === filtro) {
            exp.style.display = "block";
          } else {
            exp.style.display = "none";
          }
        }
      });
    });
  });
}

/**
 * Carrossel de Projetos
 * Implementa um carrossel para navegar entre diferentes projetos
 */
function inicializarCarrosselProjetos() {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prev-projeto");
  const nextBtn = document.getElementById("next-projeto");
  const indicadores = document.querySelectorAll(".indicador");

  if (slides.length === 0) return;

  let slideAtual = 0;
  const totalSlides = slides.length;

  // Função para atualizar o slide visível
  function atualizarSlide() {
    // Ocultar todos os slides
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${slideAtual * 100}%)`;
    });

    // Atualizar indicadores
    indicadores.forEach((ind, index) => {
      if (index === slideAtual) {
        ind.classList.add("ativo");
      } else {
        ind.classList.remove("ativo");
      }
    });
  }

  // Botão próximo
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      slideAtual = (slideAtual + 1) % totalSlides;
      atualizarSlide();
    });
  }

  // Botão anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
      atualizarSlide();
    });
  }

  // Clicar nos indicadores
  indicadores.forEach((ind, index) => {
    ind.addEventListener("click", function () {
      slideAtual = index;
      atualizarSlide();
    });
  });

  // Inicializar o primeiro slide
  atualizarSlide();

  // Adicionar navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      slideAtual = (slideAtual + 1) % totalSlides;
      atualizarSlide();
    } else if (e.key === "ArrowLeft") {
      slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
      atualizarSlide();
    }
  });
}

/**
 * Barras de Progresso Animadas
 * Anima as barras de progresso das habilidades técnicas
 */
function inicializarBarrasProgresso() {
  const barras = document.querySelectorAll(".barra");

  // Função para animar uma barra
  function animarBarra(barra) {
    const porcentagem = barra.getAttribute("data-porcentagem");
    barra.style.width = "0%";

    setTimeout(() => {
      barra.style.width = porcentagem + "%";
      barra.style.transition = "width 1.5s ease-in-out";
    }, 200);
  }

  // Animar barras quando estiverem visíveis
  function verificarBarrasVisiveis() {
    barras.forEach((barra) => {
      const rect = barra.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (
        (isVisible && barra.style.width === "0%") ||
        barra.style.width === ""
      ) {
        animarBarra(barra);
      }
    });
  }

  // Inicializar barras com largura zero
  barras.forEach((barra) => {
    barra.style.width = "0%";
  });

  // Verificar barras visíveis ao carregar e ao rolar
  window.addEventListener("load", verificarBarrasVisiveis);
  window.addEventListener("scroll", verificarBarrasVisiveis);
}

/**
 * Formulário de Contato
 * Valida e processa o envio do formulário de contato
 */
function inicializarFormularioContato() {
  const formulario = document.getElementById("formulario-contato");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
  const mensagemErro = document.getElementById("mensagem-erro");

  if (!formulario) return;

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar formulário
    if (validarFormulario()) {
      // Simular envio (em um caso real, aqui seria feita uma requisição AJAX)
      simulaEnvioFormulario();
    }
  });

  // Validação de campos em tempo real
  const camposFormulario = formulario.querySelectorAll("input, textarea");
  camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", function () {
      validarCampo(this);
    });
  });

  /**
   * Valida todos os campos do formulário
   * @returns {boolean} Retorna true se todos os campos forem válidos
   */
  function validarFormulario() {
    let formValido = true;

    // Validar nome
    const nome = document.getElementById("nome-contato");
    if (!nome.value.trim()) {
      mostrarErro(nome, "erro-nome", "Por favor, informe seu nome");
      formValido = false;
    } else {
      limparErro(nome, "erro-nome");
    }

    // Validar email
    const email = document.getElementById("email-contato");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      mostrarErro(email, "erro-email", "Por favor, informe seu email");
      formValido = false;
    } else if (!regexEmail.test(email.value)) {
      mostrarErro(email, "erro-email", "Por favor, informe um email válido");
      formValido = false;
    } else {
      limparErro(email, "erro-email");
    }

    // Validar assunto
    const assunto = document.getElementById("assunto-contato");
    if (!assunto.value.trim()) {
      mostrarErro(assunto, "erro-assunto", "Por favor, informe o assunto");
      formValido = false;
    } else {
      limparErro(assunto, "erro-assunto");
    }

    // Validar mensagem
    const mensagem = document.getElementById("mensagem-contato");
    if (!mensagem.value.trim()) {
      mostrarErro(mensagem, "erro-mensagem", "Por favor, escreva sua mensagem");
      formValido = false;
    } else if (mensagem.value.trim().length < 10) {
      mostrarErro(
        mensagem,
        "erro-mensagem",
        "A mensagem deve ter pelo menos 10 caracteres"
      );
      formValido = false;
    } else {
      limparErro(mensagem, "erro-mensagem");
    }

    return formValido;
  }

  /**
   * Valida um campo específico do formulário
   * @param {HTMLElement} campo - O campo a ser validado
   */
  function validarCampo(campo) {
    const id = campo.id;
    const valor = campo.value.trim();

    switch (id) {
      case "nome-contato":
        if (!valor) {
          mostrarErro(campo, "erro-nome", "Por favor, informe seu nome");
        } else {
          limparErro(campo, "erro-nome");
        }
        break;

      case "email-contato":
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!valor) {
          mostrarErro(campo, "erro-email", "Por favor, informe seu email");
        } else if (!regexEmail.test(valor)) {
          mostrarErro(
            campo,
            "erro-email",
            "Por favor, informe um email válido"
          );
        } else {
          limparErro(campo, "erro-email");
        }
        break;

      case "assunto-contato":
        if (!valor) {
          mostrarErro(campo, "erro-assunto", "Por favor, informe o assunto");
        } else {
          limparErro(campo, "erro-assunto");
        }
        break;

      case "mensagem-contato":
        if (!valor) {
          mostrarErro(
            campo,
            "erro-mensagem",
            "Por favor, escreva sua mensagem"
          );
        } else if (valor.length < 10) {
          mostrarErro(
            campo,
            "erro-mensagem",
            "A mensagem deve ter pelo menos 10 caracteres"
          );
        } else {
          limparErro(campo, "erro-mensagem");
        }
        break;
    }
  }

  /**
   * Exibe mensagem de erro para um campo
   * @param {HTMLElement} campo - O campo com erro
   * @param {string} idErro - O ID do elemento que exibirá a mensagem de erro
   * @param {string} mensagem - A mensagem de erro a ser exibida
   */
  function mostrarErro(campo, idErro, mensagem) {
    campo.classList.add("erro");
    const elementoErro = document.getElementById(idErro);
    if (elementoErro) {
      elementoErro.textContent = mensagem;
      elementoErro.style.display = "block";
    }
  }

  /**
   * Limpa mensagem de erro de um campo
   * @param {HTMLElement} campo - O campo a ser limpo
   * @param {string} idErro - O ID do elemento que exibe a mensagem de erro
   */
  function limparErro(campo, idErro) {
    campo.classList.remove("erro");
    const elementoErro = document.getElementById(idErro);
    if (elementoErro) {
      elementoErro.textContent = "";
      elementoErro.style.display = "none";
    }
  }

  /**
   * Simula o envio do formulário (em um caso real, seria uma requisição AJAX)
   */
  function simulaEnvioFormulario() {
    // Desabilitar botão de envio para evitar múltiplos envios
    const botaoEnviar = formulario.querySelector(".botao-enviar");
    if (botaoEnviar) {
      botaoEnviar.disabled = true;
      botaoEnviar.textContent = "Enviando...";
    }

    // Simular tempo de processamento
    setTimeout(() => {
      // Ocultar formulário
      formulario.style.display = "none";

      // Mostrar mensagem de sucesso
      if (mensagemSucesso) {
        mensagemSucesso.classList.remove("escondido");
      }

      // Resetar formulário para uso futuro
      formulario.reset();

      // Restaurar botão após alguns segundos
      setTimeout(() => {
        if (botaoEnviar) {
          botaoEnviar.disabled = false;
          botaoEnviar.textContent = "Enviar Mensagem";
        }

        // Ocultar mensagem de sucesso e mostrar formulário novamente após 5 segundos
        setTimeout(() => {
          if (mensagemSucesso) {
            mensagemSucesso.classList.add("escondido");
          }
          formulario.style.display = "block";
        }, 5000);
      }, 2000);
    }, 1500);
  }
}

/**
 * Efeito de Digitação para o Título Profissional
 * Cria um efeito de digitação no título profissional
 */
(function () {
  const tituloProfissional = document.querySelector(".titulo-profissional");

  if (tituloProfissional) {
    const texto = tituloProfissional.textContent;
    tituloProfissional.textContent = "";

    let i = 0;
    const velocidade = 100; // milissegundos por caractere

    function digitar() {
      if (i < texto.length) {
        tituloProfissional.textContent += texto.charAt(i);
        i++;
        setTimeout(digitar, velocidade);
      }
    }

    // Iniciar efeito após um pequeno atraso
    setTimeout(digitar, 500);
  }
})();

/**
 * Modo Escuro/Claro
 * Implementa a funcionalidade de alternar entre modo escuro e claro
 */
(function () {
  // Adicionar botão de alternar tema ao DOM
  const body = document.body;
  const botaoTema = document.createElement("button");
  botaoTema.id = "botao-tema";
  botaoTema.className = "botao-tema";
  botaoTema.setAttribute("aria-label", "Alternar tema claro/escuro");
  botaoTema.innerHTML = '<i class="fas fa-moon"></i>';
  body.appendChild(botaoTema);

  // Verificar preferência salva
  const temaEscuro = localStorage.getItem("tema-escuro") === "true";

  // Aplicar tema inicial
  if (temaEscuro) {
    body.classList.add("tema-escuro");
    botaoTema.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Alternar tema ao clicar no botão
  botaoTema.addEventListener("click", function () {
    body.classList.toggle("tema-escuro");
    const temEscuro = body.classList.contains("tema-escuro");

    // Atualizar ícone
    if (temEscuro) {
      botaoTema.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      botaoTema.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Salvar preferência
    localStorage.setItem("tema-escuro", temEscuro);
  });
})();
