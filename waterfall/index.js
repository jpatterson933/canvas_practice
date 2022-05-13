const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx)

let particlesArray = [];

const numberOfParticles = 300;

let lakeElement = document.getElementById('lake');

lakeMeasurements = lakeElement.getBoundingClientRect();

console.log(lakeMeasurements);

let lake = {
    x: lakeMeasurements.left,
    y: lakeMeasurements.top,
    width: window.innerWidth,
    height: 10
};

console.log(lake)


class Raindrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.weight = Math.random() * 3 + 1;
        this.directionX = 0.01;
    }
    update() {

        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.5;
        }

        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;

        // causing our bounce effect - how to bounce and create two new items?

        if (
            this.x < lake.x + lake.width &&
            this.x + this.size > lake.x &&
            this.y < lake.y + lake.height &&
            this.y + this.size > lake.y
        ) {
            this.y -= 100;
            this.weight *= -0.2;
        }
    }

    draw() {
        const color = {
            r: Math.random() * 0,
            g: Math.random() * 0,
            b: Math.random() * 255
        };

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b})`;
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
        width: window.innerWidth,
        height: 10
    }

    downpour();
})
