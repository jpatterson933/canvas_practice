// Global Variables
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
    // we grab our html content where our canvas will display
    canvas = document.getElementById('canvas1');
    // sets our canvas to 2d
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
        this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 5;
        this.#width = width;
        this.#height = height;
        // this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 20;

    }
    #drawLine(x, y) {
        const length = 300;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(mouse.x, mouse.y);
        this.#ctx.stroke();
    }

    animate(timeStamp) {
        const deltaTime = timeStamp -this.lastTime;
        this.lastTime = timeStamp;
        if(this.timer > this.interval) {
            // this.angle += 0.05;
            this.#ctx.clearRect(0, 0, this.#width, this.#height);

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize){
                    this.#drawLine(x, y);

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