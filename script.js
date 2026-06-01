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

    setTimeout(() => { t2.classList.remove('hidden'); }, 3000);
    setTimeout(() => { t3.classList.remove('hidden'); }, 6000);
    setTimeout(() => { t4.classList.remove('hidden'); t5.classList.remove('hidden'); startBtn.classList.remove('hidden'); }, 9000);

    // 3. AÇÃO DO BOTÃO COMEÇAR
    const bgMusic = document.getElementById('bgMusic');
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');
    const musicPlayer = document.getElementById('musicPlayer');

    startBtn.addEventListener('click', () => {
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');
        musicPlayer.classList.remove('hidden');
        
        // Tenta tocar a música de fundo geral
        bgMusic.play().catch(e => console.log("Autoplay bloqueado pelo navegador, aguardando interação."));
        
        initScrollReveal();
    });

    // CONTROLES DO PLAYER FLUTUANTE
    const btnPlayPause = document.getElementById('btnPlayPause');
    btnPlayPause.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            btnPlayPause.textContent = '⏸';
        } else {
            bgMusic.pause();
            btnPlayPause.textContent = '▶';
        }
    });

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
    const letterText = "Clara,\n\nHoje você celebra um marco lindo e muito especial: os seus 20 anos.\nEscrevo este pequeno espaço para te lembrar do quanto você é incrível. O seu sorriso tem um poder único de transformar qualquer dia cinzento, e o seu coração gigante inspira todos que têm a sorte de estar por perto.\n\nAdmiro seu amor imenso pelos livros, a forma linda como você dança e canta, a beleza do seu cabelo cacheado e o dom natural de deixar qualquer ambiente mais leve.\n\nQue este novo ciclo traga sorrisos infinitos, histórias maravilhas e a certeza de que você merece tudo de melhor que o mundo tem a oferecer. Parabéns! ❤️";

    function startTypewriter() {
        const txtElem = document.getElementById('typewriterText');
        let i = 0;
        function type() {
            if (i < letterText.length) {
                txtElem.innerHTML += letterText.charAt(i);
                i++;
                setTimeout(type, 35); // Velocidade da digitação
            } else {
                document.getElementById('datesText').classList.remove('hidden');
            }
        }
        type();
    }

    // 6. SURPRESA FINAL (TELA DE FOGOS DE ARTIFÍCIO)
    const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
    const finalScreen = document.getElementById('finalScreen');
    
    finalSurpriseBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        musicPlayer.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        
        // Para a música de fundo para não misturar com a comemoração
        bgMusic.pause();
        
        startFireworks();

        // Mostra mensagens finais graduais
        setTimeout(() => document.getElementById('fText2').classList.remove('hidden'), 3000);
        setTimeout(() => document.getElementById('fText3').classList.remove('hidden'), 6000);
        setTimeout(() => document.getElementById('fText4').classList.remove('hidden'), 9000);
    });

    function startFireworks() {
        const fCanvas = document.getElementById('fireworksCanvas');
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
        const fireworkTimer = setInterval(spawnFirework, 700);

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
