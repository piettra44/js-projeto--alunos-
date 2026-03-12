// controle menu mobaile
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');


    // Bloqueia o scroll quando o menu está aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';

});

// Fechar ao clicar em um link
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    });
});

// Fechar menu ao rolar a página
window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    }
});

// =========== Navegação Ativa ===========
// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.navlist a');

// Adiciona a classe 'active' ao link clicado e remove dos outros
function activeLink() {
    navLinks.forEach(link => link.classList.remove('active')); // Remove 'active' de todos os links
    this.classList.add('active'); // Adiciona 'active' ao link clicado
}

// Adiciona o evento de clique a cada link de navegação
navLinks.forEach(link => link.addEventListener('click', activeLink));

// =========== Modo claro e escuro ===========
// Função para alternar entre os modos claro e escuro
function toggleDarkMode() {
    const html = document.documentElement; // Seleciona o elemento <html>
    html.classList.toggle('light'); // Alterna a classe 'light' para ativar/desativar o modo claro

    // Armazena a preferência do usuário no localStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // Atualiza a cor do texto do titulo com base no modo atual
    updateTextColor();
}

// Carrega o tema salvo no localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light'); // Aplica o tema salvo
}

// ========== Animação do titulo ===========
// Seleciona elemento do titulo e define variaveis para animaçao
const titleElement = document.querySelector('#name');
const text = "PIETRA";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o titulo
function animateTitle() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1); // Exibe o texto até o índice atual
            index++;
        } else {
            isTyping = false; // Inicia a fase de exclusão
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1); // Remove o último caractere
            index--;
        } else {
            isTyping = true; // Reinicia a fase de digitação
        }
        // Alterna a cor do texto entre branco/preto e laranja
        currentColor = currentColor === (document.documentElement.classList.contains
        ('light') ? 'black' : '#fff') ? '#c9167b' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
        titleElement.style.color = currentColor; // Aplica a cor atual ao título
    }

    setTimeout(animateTitle, 300); // Chama a função novamente após um curto intervalo
}

// Função para atualizar a cor do texto do título com base no modo atual
function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff'; // Define a cor com base no modo
};

// Inicia a animação do título
document.addEventListener('DOMContentLoaded', animateTitle); // Inicia a animação quando o conteúdo da página estiver carregado
updateTextColor(); // Atualiza a cor do texto do título com base no modo atual

// =========== Animação da seção home ===========
// Seleciona a seção home e aplica a animação de fade-in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = 1; // Define a opacidade inicial como 1
homeSection.style.transform = 'translateY(20px)'; // Define a posição inicial como 20px para baixo
homeSection.style.transition = 'opacity 1s ease, transform 1s ease'; // Define a transição para opacidade e posição

setTimeout(() => {
    homeSection.style.opacity = 1; // Define a opacidade final como 1
    homeSection.style.transform = 'translateY(0)'; // Define a posição final como 0
},100); // Inicia a animação após um curto intervalo

// ========== Animação das seções ===========
const sections = document.querySelectorAll('section'); // Seleciona todas as seções

sections.forEach((section, index) => {
    section.style.opacity = 0; // Define a opacidade inicial como 0
    section.style.transition = 'opacity 1s, transform 1s'; // Define a transição para opacidade e posição

// Aplica diferentes animações com base no indice de cada seção
    if (index  !== 0) {
    if (index === 1) section.style.transform = 'translateY(100px)'; // Seção 1: Animação da esquerda para a direita
    else if (index === 2) section.style.transform = 'scale(0.8)'; // Seção 2: Animação de zoom
    else if (index === 3) section.style.transform = 'rotate(90deg)'; // Seção 3: Animação de rotação
    }
});

// Observer para animar as seções ao rolar a página
const observer = new IntersectionObserver ((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none';
        }
    });
});

// Oberva cada seção´para aplicar a animação
sections.forEach(section => observer.observe(section));

// =========== Botão de voltar ao topo ===========
// Adiciona um evnto de clique ao botão de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente para o topo da página
});

// =========== Carrossel de projetos ===========
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev'); 
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0; // Índice do slide atual
let autoSlideInterval; // Variável para armazenar o intervalo de auto deslizamento

// Função para mostrar o slide atual
function showSlide(slideIndex) {
    slides.forEach(slide =>{
        slide.classList.remove('active'); // Remove a classe 'active' de todos os slides
        slide.style.display = 'none'; // Esconde todos os slides
    });

    // Ajusta o indice do slide para garantir que esteja dentro dos limites
    if (slideIndex < 0) currentSlide = slides.length - 1; // Volta para o último slide se o índice for negativo
    else if (slideIndex >= slides.length) currentSlide = 0; // Volta para o primeiro slide se o índice exceder o número de slides
    else currentSlide = slideIndex; // Define o índice do slide atual

    // Exibe o slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

// Função para atualizar a posição do carrossel
function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Função para avançar para o próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();// Reinicia o intervalo de auto deslizamento
}

// Função para voltar para o slide anterior
function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide(); // Reinicia o intervalo de auto deslizamento
}

// Função para iniciar o auto deslizamento
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Avança para o próximo slide a cada 5 segundos
}

// Função para reiniciar o intervalo de auto deslizamento
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Adiciona eventos de clique aos botões de navegação
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Inicia o carrossel
window.addEventListener('load', () => {
showSlide(currentSlide);
startAutoSlide();

//Ajusta o carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
    updateSlidePosition();
});
});

//Pausa a transição automática ao remover o mouse do carrossel
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);


// ====================== FORMULÁRIO DE CONTATO =======================
//Seleciona o formulário de contato e a mensagem de agredecimento
const contactForm = document.getElementById('contactForm')
const thankYouMessage = document.getElementById('thankYouMessage')

// Adiciona um evento de envio ao formulário 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block' //Exibe a mensagem de agradecimento

    //Envia os dados do formulário usando Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json'}
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000);
        } else {
            alert ('Erro ao enviar formulário')
        }
        })
        .catch(() => alert('Erro na conexão. Tente novamente'));
    });

    // ================== ANIMAÇÃO DA SEÇÃO "SOBRE MIM" =================

// Seleciona a seção
const aboutSection = document.querySelector('.about');

// Função que verifica se a seção está visível
function checkAboutVisibility() {

    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible');
        window.removeEventListener('scroll', checkAboutVisibility);
    }

}

// Adiciona evento de scroll
window.addEventListener('scroll', checkAboutVisibility);

// Verifica ao carregar a página
checkAboutVisibility();

