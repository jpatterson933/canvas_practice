const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dotsArray = [];
const numberOfDots = 100;
// const color = {
//     r: Math.random() * 255,
//     g: Math.random() * 255,
//     b: Math.random() * 255,
//     o: Math.random()
// };

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        // this.color = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.o})`;
    }

    update() {

    }

    draw() {
        const color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
            o: Math.random()
        };

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.o})`;
        // creates a circular clipping
        // ctx.arc(400, 400, 300, 0, Math.PI * 2)
        // ctx.clip();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 30, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.o})`;
        ctx.stroke();
        ctx.closePath();
    }
}



function bulletHoles() {
    dotsArray = [];
    for (let i = 0; i < numberOfDots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.width;
        dotsArray.push(new Dot(x, y));
    }

}

bulletHoles();
console.log(dotsArray)

function animate() {
    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].draw();
    }

    // requestAnimationFrame(animate);

}

animate();