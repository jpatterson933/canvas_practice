const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// empty array for our particles
let particlesArray = [];

class Particle {
    // mandatory method is called a constructor and runs only one per each object and in our case once per each particle
    // create one new item based off of what is inside the constructor
    constructor(x, y) {
        // x property on this new blank property is going to be equal to x
        this.x = x;
        this.y = y;
        // determines size of particle
        this.size = 10;
        // determines how fast they fall and how high they bounce
        this.weight = 5;
        // force pushing on particles along x axis (wind, etc.)
        this.directionX = 2;
    }
    // calculate and update particles positions for every frame of animation
    update() {
        // this resets our particle
        if(this.y > canvas.height) { 
            // reset our particles position once y is greateer than canvas height
            this.y = 0 - this.size;
            // reset particle weight once y is greater than canvas height
            this.weight = 5;
            // this will have it dropping from a random point every time it resets
            this.x = Math.random() * canvas.width;
        }
        // for every frame of animation increase particles weight by a small amount
        this.weight += 0.01;
        // for every frame of animation increase particles y position by particles weight
        this.y += this.weight;
        // for every frame of animation add particles directionX to its horizontal x position
        this.x += this.directionX;

    }
    // take values of position x and y in size and draw a cirlce there to represent the particle
    draw() {
        ctx.fillStyle = 'red';
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

// our first particle
const particle1 = new Particle(100, 10);
// second particle
const particle2 = new Particle(400, 900);
// for loop that will draw the canvas over and over again
function animate() {
    // create a fading trail
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    // fill rectangle - covers the canvas with semi transparent rectangle over and over again
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // since this was created using are particle class it has access to all associated class methods -- update and draw
    particle1.update();
    particle1.draw();
    particle2.update();
    particle2.draw();
    // calls function once and then it stops - it will continue to call itself - this is a programming principle called recursion
    requestAnimationFrame(animate);

}

animate();