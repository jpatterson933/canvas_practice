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
// our event listenter that controls the width and height of the canvas element based off of window size
// width and height our currently set as global variable
window.addEventListener('resize', function () {
    cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});

// initial set mouse position
const mouse = {
    x: 0,
    y: 0,
};
// this is what allows the lines to follow the mouse
window.addEventListener('mousemove', function (e) {
    console.log(e)
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
    // if height and width are set to the constructor, then the canvas will fill the 
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle = 'blue';
        this.#ctx.lineWidth = 10; // size of lines
        this.cellSize = 90; // size of cells that hold lines
        this.#width = 1000; // control the width and height here
        this.#height = 1000;
        this.angle = 10;
        this.lastTime = 0;
        this.interval = 1000 / 600;
        this.timer = 100;

    }
    #drawLine(x, y) {
        this.#ctx.beginPath(); // creates a new path - once created future drawing commands are directed into the path and used to build the path up
        this.#ctx.moveTo(x, y); // second step that normally always follow the beginPath() canvas function
        this.#ctx.lineTo(mouse.x, mouse.y); // tells our line where to go, in this case, lines will follow the mouse
        this.#ctx.stroke(); // gives the lines a stroke value
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            // this will clear our canvas before rendering it - happens instantly so not seen
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            // it will move through the y and then x positions, increasing each one, and assigning the increased positional values to drawLine()
            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    this.#drawLine(x, y);
                }
            }
            this.timer = 0; // im not entirely sure what this does
        } else {
            this.timer += deltaTime; // same here, this may be to control the animation time and reset it to a point to prevent weird deviations but again I am not entirely sure as changing the values did nothing, but that might because I would have to wait a while for a deviation to actually be noticable and cause problems
        }
        // cllas our class 
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}