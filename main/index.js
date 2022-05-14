const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 30;
        this.width = 2;
    }

    // take values of position x and y in size and draw a cirlce there to represent the particle
    draw() {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 150);
        ctx.stroke();
    }

}

const star1 = new Star(100, 10);

function animate() {

    star1.draw();

    requestAnimationFrame(animate);

}