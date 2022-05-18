const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;





class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(x, y) {

        const width = 5;

        for (let i = 0; i < 45; i++){
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

const star1 = new Star();

function animate() {

    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 20; x++){
            
            star1.draw(x + Math.cos(x * 0.05), y + Math.random() * 100);
        }
    }

    // star1.draw();

    // requestAnimationFrame(animate);

}

animate();