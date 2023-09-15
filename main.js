
document.addEventListener("DOMContentLoaded", function() {
    let modeParticleColour = "#22223b";
    let loadingPercentage = 0;
    let canvas = document.getElementById("particleCanvas");
    let ctx = canvas.getContext("2d");
    let particleNumber = 15;
    let particleRingWidth = window.innerWidth / (window.innerWidth < 1000 ? 4 : 10);

    let loadingText = document.getElementById("loadingText");
    let loadingPercentageElem = document.getElementById("loadingPercentage");
    function updateLoadingText() {
        loadingPercentageElem.innerText = `${loadingPercentage}%`;
    }

    const loadingPercentageInterval = setInterval(() => {
        loadingPercentage++;
        updateLoadingText();
        if (loadingPercentage >= 100) {
            clearInterval(loadingPercentageInterval);
        }
    }, 50);

    class Particle {
        constructor(angle) {
            this.angle = angle;
            this.radius = particleRingWidth;
            this.size = 0;
            this.targetSize = Math.random() * 2.5;
            this.speed = Math.random() * 0.02 + 0.005;
            this.growthRate = this.targetSize / 250;
        }

        draw() {
            if (this.size < this.targetSize) {
                this.size += this.growthRate;
            }
            ctx.beginPath();
            ctx.arc(
                canvas.width / 2 + this.radius * Math.cos(this.angle),
                canvas.height / 2 + this.radius * Math.sin(this.angle),
                this.size,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = modeParticleColour;
            ctx.fill();
        }

        update() {
            this.angle += this.speed;
            this.draw();
        }
    }

    const particles = Array.from({ length: particleNumber }).map(
        () => new Particle(Math.random() * 2 * Math.PI)
    );

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => particle.update());
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
});
