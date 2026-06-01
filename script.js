document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FUNDO ESTRELADO ANIMADO (CANVAS)
    const canvas = document.getElementById('starryCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Criar as estrelas
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.015 + 0.005
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
            ctx.save();
            ctx.globalAlpha = Math.max(0, star.alpha);
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // 2. SEQUÊNCIA DE TEXTOS DA INTRO (Aparecimento gradual)
    const t2 = document.getElementById('introText2');
    const t3 = document.getElementById('introText3');
    const t4 = document.getElementById('introText4');
    const t5 = document.getElementById('introText5');
    const startBtn = document.getElementById('startBtn');

    setTimeout(() => { if(t2) t2.classList.remove('hidden'); }, 3000);
    setTimeout(() => { if(t3) t3.classList.remove('hidden'); }, 6000);
    setTimeout(() => { 
        if(t4) t4.classList.remove('hidden'); 
        if(t5) t5.classList.remove('hidden'); 
        if(startBtn) startBtn.classList.remove('hidden'); 
    }, 9000);

    // 3. AÇÃO DO BOTÃO COMEÇAR E REPRODUÇÃO DA MÚSICA
    const bgMusic = document.getElementById('bgMusic');
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');
    const musicPlayer = document.getElementById('musicPlayer');
    const btnPlayPause = document.getElementById('btnPlayPause');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            intro.classList.add('hidden');
            mainContent.classList.remove('hidden');
            musicPlayer.classList.remove('hidden');
            
            // Toca o áudio local após a interação do utilizador
            if (bgMusic) {
                bgMusic.load();
                setTimeout(() => {
                    bgMusic.play()
                        .then(() => {
                            if(btnPlayPause) btnPlayPause.textContent = '⏸';
                            console.log("Áudio iniciado com sucesso!");
                        })
                        .catch(e => {
                            console.log("Erro ao tocar áudio. Tentando novamente...", e);
                            bgMusic.muted = false;
                            bgMusic.play();
                        });
                }, 100);
            }
            
            initScrollReveal();
        });
    }

    // CONTROLES DO PLAYER FLUTUANTE
    if (btnPlayPause && bgMusic) {
        btnPlayPause.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                btnPlayPause.textContent = '⏸';
            } else {
                bgMusic.pause();
                btnPlayPause.textContent = '▶';
            }
        });
    }

    // 4. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL MANUAL)
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        function checkReveal() {
            const triggerBottom = window.innerHeight * 0.85;
            reveals.forEach(reveal => {
                const revealTop = reveal.getBoundingClientRect().top;
                if (revealTop < triggerBottom) {
                    reveal.classList.add('active');
                    
                    // Dispara o efeito máquina de escrever quando chegar na carta
                    if (reveal.id === 'letterBox' && !reveal.classList.contains('typed')) {
                        reveal.classList.add('typed');
                        startTypewriter();
                    }
                }
            });
        }
        window.addEventListener('scroll', checkReveal);
        checkReveal(); // Checagem inicial
    }

    // 5. EFEITO MÁQUINA DE ESCREVER (CARTA)
    const letterText = "Clara,\n\nHoje é um dia inteiramente seu. Enquanto planejava isso, fiquei pensando em quantas palavras seriam necessárias para descrever a imensidão que é você. A verdade é que nenhuma palavra parece suficiente.\n\nVocê tem esse jeito único de fazer os ambientes ficarem mais leves. Tem um coração tão bondoso, que cuida de todo mundo ao redor, sempre com esse sorriso lindo e acolhedor no rosto. Eu admiro profundamente a sua inteligência, a sua força e a forma genuína como você ajuda as pessoas.\n\nVer você imersa em seus livros, ou simplesmente sendo você mesma – cantando, dançando, jogando e espalhando alegria – é um dos meus maiores privilégios. Esta surpresa foi criada com muitas horas de dedicação, pensando em cada detalhe, no seu cabelo cacheado, na sua cor favorita e no seu sorriso, apenas para que você sinta pelo menos uma fração do quanto é admirada e valorizada.\n\nHoje, celebramos 20 anos de uma trajetória linda. Uma história da qual tenho muito orgulho de acompanhar de perto.\n\nFeliz aniversário, Clara.\nObrigado por ser exatamente quem você é.\n\nCom todo meu amor,\nUanderson ❤️";

    function startTypewriter() {
        const txtElem = document.getElementById('typewriterText');
        if(!txtElem) return;
        let i = 0;
        function type() {
            if (i < letterText.length) {
                txtElem.innerHTML += letterText.charAt(i);
                i++;
                setTimeout(type, 35); // Velocidade da digitação
            } else {
                const datesText = document.getElementById('datesText');
                if(datesText) datesText.classList.remove('hidden');
            }
        }
        type();
    }

    // 6. SURPRESA FINAL (TELA DE FOGOS DE ARTIFÍCIO)
    const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
    const finalScreen = document.getElementById('finalScreen');
    
    if (finalSurpriseBtn) {
        finalSurpriseBtn.addEventListener('click', () => {
            mainContent.classList.add('hidden');
            musicPlayer.classList.add('hidden');
            finalScreen.classList.remove('hidden');
            
            // Para a música de fundo para não misturar com a comemoração
            if (bgMusic) bgMusic.pause();
            
            startFireworks();

            // Mostra mensagens finais graduais
            setTimeout(() => { const f = document.getElementById('fText2'); if(f) f.classList.remove('hidden'); }, 3000);
            setTimeout(() => { const f = document.getElementById('fText3'); if(f) f.classList.remove('hidden'); }, 6000);
            setTimeout(() => { const f = document.getElementById('fText4'); if(f) f.classList.remove('hidden'); }, 9000);
        });
    }

    function startFireworks() {
        const fCanvas = document.getElementById('fireworksCanvas');
        if(!fCanvas) return;
        const fCtx = fCanvas.getContext('2d');
        fCanvas.width = window.innerWidth;
        fCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            fCanvas.width = window.innerWidth;
            fCanvas.height = window.innerHeight;
        });

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = Math.random() * 2 + 1;
                this.velocity = {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                };
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.012;
            }
            draw() {
                fCtx.save();
                fCtx.globalAlpha = this.alpha;
                fCtx.beginPath();
                fCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                fCtx.fillStyle = this.color;
                fCtx.fill();
                fCtx.restore();
            }
            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.velocity.y += 0.04; // gravidade sutil
                this.alpha -= this.decay;
            }
        }

        let particles = [];
        const colors = ['#fcd34d', '#d8b4fe', '#ff4bb4', '#4bffff', '#ff4b4b'];

        function spawnFirework() {
            const x = Math.random() * fCanvas.width;
            const y = Math.random() * (fCanvas.height * 0.6);
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color));
            }
        }

        // Intervalo de surgimento dos fogos
        setInterval(spawnFirework, 700);

        function animate() {
            fCtx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // Rastro preto azulado
            fCtx.fillRect(0, 0, fCanvas.width, fCanvas.height);
            
            particles.forEach((p, index) => {
                if (p.alpha <= 0) {
                    particles.splice(index, 1);
                } else {
                    p.update();
                    p.draw();
                }
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
