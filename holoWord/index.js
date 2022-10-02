const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function draw() {
    ctx.font = '48px serif';
    // ctx.fillText('Jeffery W. Patterson', 10, 50);

    let gradient = ctx.createLinearGradient(0, 50, 40, 0);
    gradient.addColorStop("0", "green");
    gradient.addColorStop("0.5", "black");
    gradient.addColorStop("1.0", "green");

    ctx.strokeStyle = gradient;
    ctx.strokeText('Jeffery W. Patterson', 10, 55)
    // ctx.strokeText("this working?", 20, 90);
};

// draw();

let time = 0;

const color = function (x, y, r, g, b) {
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x, y, 200, 200);
};
// the 100 at the end affects how quickly everything is changeing
const Red = function (x, y, time) {
    return (Math.floor(100 + 64 * Math.cos((x * x - y * y) / 100 + time)));
};
// the 100 at the end affects the gradient turn in the corner as well as how quickly it changes
const Green = function (x, y, time) {
    return (Math.floor(200 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 100)));
};
// the 1100 is what is affecting how smooth the gradient looks
// the number in return right aftr Math.floor will affect how much of that color will be in the gradient
const Blue = function (x, y, time) {
    return (Math.floor(200 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
};

// the number of the x or y control the size of the outer layers // can you add even more layers
const startAnimation = function () {
    for (x = 0; x <= 10; x++) {
        for (y = 0; y <= 60; y++) {
            color(x, y, Red(x, y, time), Green(x, y, time), Blue(x, y, time));
        }
    }
    time = time + 0.01;
    window.requestAnimationFrame(startAnimation);
};

startAnimation();




class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(x, y) {

        const width = 5;

        for (let i = 0; i < 45; i++) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.moveTo((Math.random() * 95), (Math.random() * 95))
            ctx.lineTo(x, y)
            ctx.lineWidth = Math.random() * width;
            ctx.stroke();
            ctx.clearRect(0, 0, 0, 0);
        }




    }

}

// const star1 = new Star();

function animate() {

    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 20; x++) {

            star1.draw(x + Math.cos(x * 0.05), y + Math.random() * 100);
        }
    }

    // star1.draw();

    // requestAnimationFrame(animate);

}

animate();