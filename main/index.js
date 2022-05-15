const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {

        const width = 5;

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 150);
        ctx.lineWidth = Math.random() * width ;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, 150);
        ctx.lineTo(300, 0);
        ctx.lineWidth = Math.random() * width;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 150);
        ctx.lineWidth = Math.random() * width;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, 75);
        ctx.lineTo(300, 75);
        ctx.lineWidth = Math.random() * width;
        ctx.stroke();

    }

}

const star1 = new Star();

function animate() {

    star1.draw();

    requestAnimationFrame(animate);

}

animate();