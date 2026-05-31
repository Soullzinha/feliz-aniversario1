document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. SISTEMA DE PARTÍCULAS - CÉU ESTRELADO
    // ----------------------------------------------------
    const canvas = document.getElementById('starryCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height, particles;

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        
        const numParticles = window.innerWidth < 768 ? 100 : 200;
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                opacity: Math.random(),
                speed: (Math.random() * 0.05) + 0.01
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.opacity += p.speed;
            if (p.opacity > 1 || p.opacity < 0) p.speed *= -1; // Piscar suave
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(p.opacity)})`;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    initCanvas();
    drawStars();
    window.addEventListener('resize', initCanvas);

    // ----------------------------------------------------
    // 2. FLUXO DE ABERTURA E MÚSICA
    // ----------------------------------------------------
    const introTexts = [
        document.getElementById('introText1'),
        document.getElementById('introText2'),
        document.getElementById('introText3'),
        document.getElementById('introText4'),
        document.getElementById('introText5'),
    ];
    const startBtn = document.getElementById('startBtn');
    
    // Animar a abertura cronologicamente
    let delay = 0;
    introTexts.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove('hidden');
        }, delay);
        delay += (index === 3) ? 3000 : 2500; // Tempo extra para o nome da Clara
    });

    setTimeout(() => {
        startBtn.classList.remove('hidden');
    }, delay + 1000);

    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const introSection = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');

    startBtn.addEventListener('click', () => {
        // Iniciar música e mostrar player
        bgMusic.play().catch(e => console.log("Autoplay bloqueado.", e));
        musicPlayer.classList.remove('hidden');
        
        // Transição de tela
        introSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Disparar efeito de typewriter da carta caso o usuário desça rápido
        initScrollAnimations();
    });

    btnPlayPause.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            btnPlayPause.textContent = "⏸";
        } else {
            bgMusic.pause();
            btnPlayPause.textContent = "▶";
        }
    });

    // ----------------------------------------------------
    // 3. ANIMAÇÕES NO SCROLL (REVEAL)
    // ----------------------------------------------------
    function initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;

            reveals.forEach(reveal => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                    
                    // Se for a caixa da carta, iniciar a máquina de escrever
                    if (reveal.id === 'letterBox' && !reveal.classList.contains('typed')) {
                        reveal.classList.add('typed');
                        typeLetter();
                    }
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Checar na carga inicial
    }

    // ----------------------------------------------------
    // 4. MÁQUINA DE ESCREVER (CARTA)
    // ----------------------------------------------------
    const letterContent = `Clara,\n\nHoje é um dia inteiramente seu. Enquanto planejava isso, fiquei pensando em quantas palavras seriam necessárias para descrever a imensidão que é você. A verdade é que nenhuma palavra parece suficiente.\n\nVocê tem esse jeito único de fazer os ambientes ficarem mais leves. Tem um coração tão bondoso, que cuida de todo mundo ao redor, sempre com esse sorriso lindo e acolhedor no rosto. Eu admiro profundamente a sua inteligência, a sua força e a forma genuína como você ajuda as pessoas.\n\nVer você imersa em seus livros, ou simplesmente sendo você mesma – cantando, dançando, jogando e espalhando alegria – é um dos meus maiores privilégios. Esta surpresa foi criada com muitas horas de dedicação, pensando em cada detalhe, no seu cabelo cacheado, na sua cor favorita e no seu sorriso, apenas para que você sinta pelo menos uma fração do quanto é admirada e valorizada.\n\nHoje, celebramos 20 anos de uma trajetória linda. Uma história da qual tenho muito orgulho de acompanhar de perto.\n\nFeliz aniversário, Clara.\nObrigado por ser exatamente quem você é.\n\nCom todo meu amor,\nUanderson ❤️`;

    const typeWriterEl = document.getElementById('typewriterText');
    const datesEl = document.getElementById('datesText');
    let typeIndex = 0;

    function typeLetter() {
        if (typeIndex < letterContent.length) {
            typeWriterEl.textContent += letterContent.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeLetter, 30); // Velocidade da digitação
        } else {
            // Após terminar de digitar, revelar as datas discretamente
            setTimeout(() => {
                datesEl.classList.remove('hidden');
                datesEl.style.opacity = 0;
                datesEl.style.transition = "opacity 2s";
                setTimeout(() => { datesEl.style.opacity = 1; }, 100);
            }, 1000);
        }
    }

    // ----------------------------------------------------
    // 5. SURPRESA FINAL (FOGOS DE ARTIFÍCIO)
    // ----------------------------------------------------
    const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
    const finalScreen = document.getElementById('finalScreen');
    const fTexts = [
        document.getElementById('fText1'),
        document.getElementById('fText2'),
        document.getElementById('fText3'),
        document.getElementById('fText4')
    ];

    finalSurpriseBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        musicPlayer.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        startFireworks();
        
        let fDelay = 0;
        fTexts.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.remove('hidden');
                el.classList.add('fade-text');
            }, fDelay);
            fDelay += 4000;
        });
    });

    function startFireworks() {
        const fwCanvas = document.getElementById('fireworksCanvas');
        const fctx = fwCanvas.getContext('2d');
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;

        const fwParticles = [];
        const colors = ['#d8b4fe', '#fcd34d', '#ffffff', '#581c87']; // Lilás, Ouro, Branco, Roxo

        function createExplosion(x, y) {
            for (let i = 0; i < 50; i++) {
                fwParticles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }

        function animateFireworks() {
            fctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // Rastro suave
            fctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

            // Criar explosões aleatórias
            if (Math.random() < 0.05) {
                createExplosion(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height / 2);
            }

            for (let i = 0; i < fwParticles.length; i++) {
                let p = fwParticles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // Gravidade
                p.alpha -= 0.02;

                fctx.globalAlpha = p.alpha;
                fctx.fillStyle = p.color;
                fctx.beginPath();
                fctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                fctx.fill();

                if (p.alpha <= 0) {
                    fwParticles.splice(i, 1);
                    i--;
                }
            }
            fctx.globalAlpha = 1;
            requestAnimationFrame(animateFireworks);
        }
        animateFireworks();
    }
});
