const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const numberOfParticles = 50;

let lakeElement = document.getElementById('lake');

lakeMeasurements = lakeElement.getBoundingClientRect();

console.log(lakeMeasurements);

let lake = {
    x: lakeMeasurements.left,
    y: lakeMeasurements.top,
    width: lakeMeasurements.width,
    height: 5
};

console.log(lake)

// console.log(lake)

class Raindrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1 + 1;
        this.weight = Math.random() * 2 + 1;
        this.directionX = 0.01;
    }
    update() {

        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 2 + 1;
            this.x = Math.random() * canvas.width * 1.5;
        }

        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;

        if (
            this.x < lake.x + lake.width &&
            this.x + this.size > lake.x &&
            this.y < lake.y + lake.height &&
            this.y + this.size > lake.y
        ) {
            this.y -= 3;
            this.weight *= -0.3;
        }
    }

    draw() {
        ctx.fillStyle = '#03A062';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function downpour() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Raindrop(x, y));
    }
}

downpour();

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lakeMeasurements = lakeElement.getBoundingClientRect();
    lake = {
        x: lakeMeasurements.left,
        y: lakeMeasurements.top,
        width: lakeMeasurements.width,
        height: 10
    }

    downpour();
})
