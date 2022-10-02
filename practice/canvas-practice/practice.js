// Global Variables
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

// this will trigger these events as soon as the page is full loaded
window.onload = function () {
    // canvas element on html - canvas has width and heigth variables
    canvas = document.getElementById('canvas1');
    // ctx is shortcut for context the built in get context can only called on a variable that holds a reference to an html element 
    ctx = canvas.getContext('2d');
    // here we set the width and height of the canvas variable to be that of the windows inner width and inner height
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
    // we create a 3 private class fields for context, width, and height
    #ctx;
    #width;
    #height;

    // constructor is a special mandaotry method every javascript needs to have
    // we give it three arguements
    constructor(ctx, width, height) {
        // -- we take the private class field #ctx and assign it to the ctx passed in as an argument -----------
        this.#ctx = ctx;
        // this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 0.5;
        // - what we are doing is using the constructor to take global variables and assign them to private class fields - this is encapsulation ctx, width, height - this is how animation libraries are made - private class fields first have to be declared above before they are called inside of the constructor
        this.#width = width;
        this.#height = height;
        // --------------------------encapsulation is one of the main principles of object oriented programming - encapsulation is the bundling of data and methods that act on that data in a way that access to the data is restricted from outside of the bundle
        // this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        // grid cell size
        this.cellSize = 15;
        // variable for setting and creating gradient
        this.gradient;
        // calling our creategradient
        this.#createGradient();
        // here we are assigning the gradient to the stroke style -- "createLinearGradient() method of the Canvas 2d API creates a gradient along the line connecting two given coordinates. To be applied to a shape, the gradient must first be assigned to the fillStyle or strokeStyle properties"
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        // velocity of radius
        this.vr = 0.05;

    }

    #createGradient() {

        // there are four parameters defining the start and end points of the gradient line - first: the x-axis coodrinate of the start point - second: the y-axis coodrinate of the start point - third: the x-axis coordinate of the end point - fourth: the y-axis coordinate of the end point
        // to summarize the four points are: x, y starting point and x, y ending points
        // here are are saying upper left is where we will start and our ending will be defined the the width and height - the two parameters in the contructor that are connected to the inner width and inner height of the window when the document loads
        this.gradient = this.#ctx.createLinearGradient(1, 1, this.#width, this.#height); // if you subtract from the width and height it alters where the gradient ends up, starts, ect.
        // color stop is used to define the stopping point of the color
        // the two parameters are when the color should start 1 being the most and what the color should be
        this.gradient.addColorStop("0.0", "#7FFF00");
        this.gradient.addColorStop("0.25", "#000000");
        this.gradient.addColorStop("0.5", "#00FFFF");
        this.gradient.addColorStop("0.9", "#000000");
        this.gradient.addColorStop("1", "#7FFF00");

    }

    // this job is to draw lines - we can call begin path and draw however many lines we would like
    #drawLine(angle, x, y) {
        // the length of our line
        const length = 30;
        // where the path line will begin
        // the beginPath is called before beginning each line - can be called multople times and looks like it is always connected to the context (ctx)
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        // x and y line movement / size on grid - direction of lines
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();

        // we can call however many begin paths as we want
        this.#ctx.beginPath();
        this.#ctx.moveTo(x + 1, y + 1);
        // x and y line movement / size on grid - direction of lines
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }

    animate(timeStamp) {
        const deltaTime = timeStamp -this.lastTime;
        this.lastTime = timeStamp;
        // this if statement says if our timer is greater than our interval then we need to 
        if(this.timer > this.interval) {
            // this.angle += 0.05;
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr;
            // this if statement creates a bouncing effects with our animation on the canvas
            if (this.radius > 500 || this.radius < -50) this.vr *= -1;
            // this is how you map a grid on canvas using nested for loops
            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize){
                    // changing the 0.01 changes the zoomed in with the lower number zooming us in further
                    const angle = (Math.cos(x * 0.005) + Math.sin(y * 0.005)) * this.radius;
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