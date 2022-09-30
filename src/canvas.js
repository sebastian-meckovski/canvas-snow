var canvas = document.querySelector("canvas");
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init()
});

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});

var colorArray = ["#4a4e4d", "#0e9aa7", "#3da4ab", "#f6cd61", "#fe8a71"];

class Circle {
  constructor(x, y, dx, dy, radius, maxRadius, minRadius) {
    var color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
      c.beginPath();
      c.arc(x, y, radius, 15, 60, false);
      c.fill();
      c.fillStyle = color;
      c.stroke();
    };
    this.update = function () {
      if (x + radius > canvas.width || x - radius < 1) {
        dx = -dx;
      }
      if (y + radius > canvas.height || y - radius < 1) {
        dy = -dy;
      }

      x += dx;
      y += dy;

      // interactivity

      if (
        mouse.x - x < 40 &&
        mouse.x - x > -40 &&
        mouse.y - y < 40 &&
        mouse.y - y > -40
      ) {
        if (radius < maxRadius) {
          radius += 15;
        }
      } else if (radius > minRadius) {
        radius -= 5;
      }
    };
  }
}

var circleArray = [];
function init(){
  circleArray = [];

  for (var i = 1; i < 500; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var radius = Math.random() * 3 + 1;
    var maxRadius = Math.random() * 70;
    var minRadius = 5;
    circleArray.push(new Circle(x, y, dx, dy, radius, maxRadius, minRadius));
  }
}

init()

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}

animate();
