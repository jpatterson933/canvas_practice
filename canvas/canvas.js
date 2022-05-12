// Global Variables
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}

window.addEventListener('resize', function () {
    cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});
const mouse = {
    x: 0,
    y: 0,
};

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
})
//classes encapsulate data and work on that data with their methods
class FlowFieldEffect {
    // # = private class
    // if you create a public method, then you can access the private class from the outside
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        // this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 1;
        this.#width = width;
        this.#height = height;
        // this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        // grid cell size
        this.cellSize = 15;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        // velocity of radius
        this.vr = 0.003;

    }

    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1", "#ff5c33");
        this.gradient.addColorStop("0.2", "#ff66b3");
        this.gradient.addColorStop("0.4", "#ccccff");
        this.gradient.addColorStop("0.6", "#b3ffff");
        this.gradient.addColorStop("0.8", "#80ff80");
        this.gradient.addColorStop("0.9", "#ffff33");


    }

    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx * dx + dy * dy;
        if (distance > 600000) distance = 600000;
        else if (distance < 50000) distance = 50000;
        const length = distance/10000;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        // x and y line movement / size on grid - direction of lines
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }

    animate(timeStamp) {
        const deltaTime = timeStamp -this.lastTime;
        this.lastTime = timeStamp;
        if(this.timer > this.interval) {
            // this.angle += 0.05;
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr;
            if (this.radius > 10 || this.radius < -10) this.vr *= -1;
            // this is how you map a grid on canvas using nested for loops
            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize){
                    // changing the 0.01 changes the zoomed in with the lower number zooming us in further
                    const angle = (Math.cos(x * 0.5) + Math.sin(y * 0.5)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        // console.log("animating");
        // console.log(deltaTime)
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }


}