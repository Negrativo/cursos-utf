document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card'); // Cards de Java, Node, Flask
    const courseLessonsSection = document.getElementById('courseLessonsSection'); // A seção animada
    const lessonsSectionTitle = document.getElementById('lessonsSectionTitle'); // Título da seção animada
    const lessonsCardsContainer = document.getElementById('lessonsCardsContainer'); // Onde os cards de aula serão inseridos
    const closeLessonsSectionButton = document.getElementById('closeLessonsSection'); // Botão de fechar a seção animada

    const videoModal = document.getElementById('videoModal'); // O modal do vídeo
    const youtubeVideoIframe = document.getElementById('youtube-video');
    const closeVideoModalButton = document.querySelector('.close-video-modal');

    // Dados das aulas (com descrições adicionadas)
    const coursesData = {
        java: {
            title: "Curso de Java",
            lessons: [
                { title: "Aula 1: Introdução ao Java e configuração de ambiente", videoId: "2vMuo6lG9Nk", description: "Entenda os fundamentos e o ambiente de desenvolvimento Java." },
                { title: "Aula 2: Iniciando projeto Java Spring boot", videoId: "-cuEyk4ICz0", description: "Entenda a inicialização de um projeto Spring Boot e estrutura de projeto." },
                { title: "Aula 3: Entendendo e estruturando Repository", videoId: "NSnabzSX0DI", description: "Aprenda a criar uma interface de Repository para trabalhar a entidade com o banco de dados." },
                { title: "Aula 4: Entendendo e estruturando Service", videoId: "P1QyMWyBGwE", description: "Aprenda a criar uma service para manipular informações do banco de dados junto a repository." },
                { title: "Aula 5: Entendendo e estruturando Controler", videoId: "", description: "Aprenda a criar uma controler para dispobilizar os processos do servidor Java via API." }
            ]
        },
        node: {
            title: "Curso de Node.js",
            lessons: [
                { title: "Aula 1: Primeiros Passos com Node.js", videoId: "k024_dK99xU", description: "Instalação, execução de scripts básicos e o ciclo de vida de uma aplicação Node." },
                { title: "Aula 2: Módulos e NPM", videoId: "TlB_eWDSMx4", description: "Entenda como usar módulos nativos e externos, e gerencie dependências com o NPM." },
                { title: "Aula 3: Servidores Web com Express", videoId: "Fk3-t_R8B7Q", description: "Construa uma API RESTful simples usando o framework Express.js." },
                { title: "Aula 4: Banco de Dados com MongoDB", videoId: "Fk3-t_R8B7Q", description: "Conecte sua aplicação Node.js a um banco de dados MongoDB." }
            ]
        },
        flask: {
            title: "Curso de Flask",
            lessons: [
                { title: "Aula 1: Introdução ao Flask", videoId: "Z1yRj5N1ZpM", description: "Visão geral do microframework Flask e sua filosofia de desenvolvimento web." },
                { title: "Aula 2: Rotas e Views", videoId: "4_s2Yc-K0Xw", description: "Crie URLs e funções Python para responder às requisições web." },
                { title: "Aula 3: Templates com Jinja2", videoId: "yJg_W-S7Bjo", description: "Gere HTML dinâmico utilizando a poderosa linguagem de template Jinja2." },
                { title: "Aula 4: Formulários e WTForms", videoId: "yJg_W-S7Bjo", description: "Lide com entrada de dados do usuário e validação com WTForms." }
            ]
        }
    };

    // Event listener para os cards de curso principais
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const language = card.dataset.language;
            const course = coursesData[language];

            if (course) {
                lessonsSectionTitle.textContent = `Aulas do ${course.title}`; // Título da seção animada
                lessonsCardsContainer.innerHTML = ''; // Limpa os cards de aula anteriores

                // Cria e adiciona os cards de aula
                course.lessons.forEach(lesson => {
                    const lessonCard = document.createElement('div'); // Usamos div para o card de aula
                    lessonCard.classList.add('lesson-card');
                    lessonCard.dataset.videoId = lesson.videoId;

                    lessonCard.innerHTML = `
                        <h3>${lesson.title}</h3>
                        <p>${lesson.description}</p>
                    `;

                    lessonsCardsContainer.appendChild(lessonCard);
                });

                // Adiciona a classe 'active' para exibir e animar a seção
                courseLessonsSection.classList.add('active');

                // Opcional: Rola a página para a seção de aulas
                courseLessonsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Event listener para os cliques nos cards de aula (dentro da seção animada)
    lessonsCardsContainer.addEventListener('click', (event) => {
        const target = event.target;
        // Verifica se o clique foi em um elemento que é um .lesson-card ou está dentro dele
        const clickedLessonCard = target.closest('.lesson-card');

        if (clickedLessonCard) {
            const videoId = clickedLessonCard.dataset.videoId;
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                youtubeVideoIframe.src = embedUrl;
                videoModal.style.display = 'flex'; // Abre o modal do vídeo
            }
        }
    });

    // Fechar a seção de aulas ao clicar no botão "Fechar Aulas"
    closeLessonsSectionButton.addEventListener('click', () => {
        courseLessonsSection.classList.remove('active');
        lessonsCardsContainer.innerHTML = ''; // Limpa os cards ao fechar
    });

    // Fechar o modal do vídeo
    closeVideoModalButton.addEventListener('click', () => {
        videoModal.style.display = 'none';
        youtubeVideoIframe.src = ''; // Para o vídeo
    });

    // Fechar modal do vídeo ao clicar fora
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            youtubeVideoIframe.src = ''; // Para o vídeo
        }
    });
});