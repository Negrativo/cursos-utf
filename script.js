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
                { title: "Aula 5: Entendendo e estruturando Controler", videoId: "MKbavgytXEw", description: "Aprenda a criar uma controler para dispobilizar os processos do servidor Java via API." },
                { title: "Aula 6: Fazendo requisições para o servidor Java", videoId: "MKbavgytXEw", description: "Aprenda a fazer requisições http para o servidor Java e execute os processos construidos em aula." },
                {
                    title: "Exercícios de Fixação - Java",
                    type: "pdf",
                    pdfUrl: "public/exercicios_java.pdf",
                    description: "Baixe uma lista de exercícios para praticar os conceitos de Java aprendidos nas aulas.",
                    iconClass: "fa-file-pdf",
                    buttonText: "Baixar Exercícios"
                },
                {
                    title: "Resolução dos Exercícios - Java",
                    type: "pdf",
                    pdfUrl: "public/resolucao_java.pdf",
                    description: "Acesse as resoluções detalhadas dos exercícios de Java para conferir seu aprendizado.",
                    iconClass: "fa-file-pdf",
                    buttonText: "Ver Resolução"
                }
            ]
        },
        node: {
            title: "Curso de Node.js",
            lessons: [
                { title: "Aula 1: Configuração do ambiente de desenvolvimento", videoId: "IuPXnmtG4kk", description: "Instalação das dependencias do projeto e criação do modelo de dados que irá ser utilizado nas operações implementadas." },
                { title: "Aula 2: Endpoints de CREATE e READ", videoId: "fKAt8qw05oY", description: "Ínicio do desenvolvimento da CRUD de livros com implementações das rotas de cadastro, listagem e listagem por id." },
                { title: "Aula 3: Endpoints de UPDATE e DELETE", videoId: "jU1Axi9MZkE", description: "Continuação do desenvolvimento da CRUD com o desenvolvimento das rotas de edição e exclusão de um livro." },
                {
                    type: "pdf",
                    title: "Exercícios de Fixação - Javascript",
                    pdfUrl: "public/tasks_node.png",
                    description: "Lista de exercícios para praticar os conceitos de programação backend com node.js aprendidos nas aulas.",
                    iconClass: "fa-file-pdf",
                    buttonText: "Visualizar Exercícios"
                },
            ]
        },
        flask: {
            title: "Curso de Flask",
            lessons: [
                { title: "Aula 1: Introdução ao Flask", videoId: "Inp79ZcIjDI", description: "criando uma rota raiz com hello word." },
                { title: "Aula 2: Rotas", videoId: "f7yuwEKTXAs", description: "criando o CRUD." },
                { title: "Aula 3: API com Banco de dados", videoId: "HrQIkkWUQNA", description: "implementando banco de dados." },
                { title: "Aula 4: Formulários", videoId: "ZgF0m2RLhGs", description: "manipule api com frontend" }
                ,
                { 
                    title: "Exercícios de fixação - Python",
                    type: "pdf",
                    pdfUrl: "public/questoes_flask_simples.pdf",
                    description: "Lista de exercícios para prática de backend usando flask",
                    iconClass: " fa-file-pdf",
                    buttonText: "Visualizar exercícios"
                }
            ]
        }
    };

    // Event listener para os cards de curso principais
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const language = card.dataset.language;
            const course = coursesData[language];

            if (course) {
                lessonsSectionTitle.textContent = `Aulas do ${course.title}`;
                lessonsCardsContainer.innerHTML = '';

                // Cria e adiciona os cards de aula ou PDF
                course.lessons.forEach(lesson => {
                    const lessonCard = document.createElement('div');
                    lessonCard.classList.add('lesson-card');

                    // Lógica para diferenciar entre vídeos e PDFs
                    if (lesson.type === 'pdf') {
                        lessonCard.classList.add('pdf-card');
                        lessonCard.innerHTML = `
                            <h3><i class="fas ${lesson.iconClass}"></i> ${lesson.title}</h3>
                            <p>${lesson.description}</p>
                            <a href="${lesson.pdfUrl}" target="_blank" class="pdf-button">${lesson.buttonText}</a>
                        `;
                    } else {
                        // É um vídeo
                        lessonCard.dataset.videoId = lesson.videoId;
                        lessonCard.innerHTML = `
                            <h3>${lesson.title}</h3>
                            <p>${lesson.description}</p>
                        `;
                    }
                    lessonsCardsContainer.appendChild(lessonCard);
                });

                courseLessonsSection.classList.add('active');
                courseLessonsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Event listener para os cliques nos cards de aula (dentro da seção animada)
    lessonsCardsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const clickedLessonCard = target.closest('.lesson-card');

        if (clickedLessonCard) {
            const videoId = clickedLessonCard.dataset.videoId;
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                youtubeVideoIframe.src = embedUrl;
                videoModal.style.display = 'flex';
            }
        }
    });

    // Fechar a seção de aulas ao clicar no botão "Fechar Aulas"
    closeLessonsSectionButton.addEventListener('click', () => {
        courseLessonsSection.classList.remove('active');
        lessonsCardsContainer.innerHTML = '';
    });

    // Fechar o modal do vídeo
    closeVideoModalButton.addEventListener('click', () => {
        videoModal.style.display = 'none';
        youtubeVideoIframe.src = '';
    });

    // Fechar modal do vídeo ao clicar fora
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            youtubeVideoIframe.src = '';
        }
    });
});
