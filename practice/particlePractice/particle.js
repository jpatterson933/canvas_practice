const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// empty array for our particles
let particlesArray = [];
// number of particles to create limit
const numberOfParticles = 300;

// measure title element
let titleElement = document.getElementById('title1');
// getBoundingClientRect() - returns an object that contains the size of an element and its position relative to the browser window
titleMeasurements = titleElement.getBoundingClientRect();
// console log to get details of title element
// console.log(titleMeasurements)
// below we are going to convert the titleMeasurements html bounding box into a javascripot object
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10
}

class Particle {
    // mandatory method is called a constructor and runs only one per each object and in our case once per each particle
    // create one new item based off of what is inside the constructor
    constructor(x, y) {
        // x property on this new blank property is going to be equal to x
        this.x = x;
        this.y = y;
        // determines size of particle
        this.size = Math.random() * 15 + 1;
        // determines how fast they fall and how high they bounce
        this.weight = Math.random() * 2 + 1;
        // force pushing on particles along x axis (wind, etc.)
        this.directionX = (Math.random() * 2) - 1;
    }
    // calculate and update particles positions for every frame of animation
    update() {
        // this resets our particle
        if (this.y > canvas.height) {
            // reset our particles position once y is greateer than canvas height
            this.y = 0 - this.size;
            // reset particle weight once y is greater than canvas height
            this.weight = Math.random() * 2 + 1;
            // this will have it dropping from a random point every time it resets * 1.5 spreads particles across the map
            this.x = Math.random() * canvas.width * 1.5;
        }
        // for every frame of animation increase particles weight by a small amount
        this.weight += 0.01;
        // for every frame of animation increase particles y position by particles weight aka. gravity
        this.y += this.weight;
        // for every frame of animation add particles directionX to its horizontal x position aka. wind
        this.x += this.directionX;

        // check for collision between each particle and title element
        if (
            // this checks if particle and title intersect at horizontal x axis and vertical y axis - if all of these are true then we know that particle is colliding with title element
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            // makeing the particle lighter and bounce
            this.weight *= -0.4;

        }

    }
    // take values of position x and y in size and draw a cirlce there to represent the particle
    draw() {
        ctx.fillStyle = 'purple';
        // circle on canvas is considered a path similar to how you draw a line
        ctx.beginPath();
        // takes five arguments / position on x axis / position on y axis / radius to determine size / where we want to start the shape - angle / and then end angle
        // Math.PI * 2 - creates a circle that is 360 degress
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        // close path will end the path
        ctx.closePath();
        // this will fill the drawing
        ctx.fill();
    }
}
// custom function - job - to run a for loop to fill particle array with 300 randomize particles using our particle class constructor
function init() {
    // empty particles array when window is resized
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        // create random numbers for our x and y arguments in our Particle class
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y))
    }
    console.log(particlesArray)
}
init();

// our first particle
// const particle1 = new Particle(100, 10);
// second particle
// const particle2 = new Particle(400, 900);
// for loop that will draw the canvas over and over again
function animate() {
    // create a fading trail
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    // fill rectangle - covers the canvas with semi transparent rectangle over and over again
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // since this was created using are particle class it has access to all associated class methods -- update and draw
    // particle1.update();
    // particle1.draw();
    // particle2.update();
    // particle2.draw();

    // for loop to update draw and animate particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    // we are drawing our bounding box from the object we created with the coordinates abstracted from the html element - fill REct arguments (x, y, width, height) 
    // ctx.fillRect(title.x, title.y, title.width, title.height); 

    // calls function once and then it stops - it will continue to call itself - this is a programming principle called recursion
    requestAnimationFrame(animate);

}

animate();

// this will fix any issues we get from resizing window
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10

    }
    // particle creation function
    init();
})