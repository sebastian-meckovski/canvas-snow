import { useEffect, useRef } from "react";
import "./App.css";

function SebSnow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    var mouse = {
      x: undefined,
      y: undefined,
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    var colorArray = ["#4a4e4d", "#0e9aa7", "#3da4ab", "#f6cd61", "#fe8a71"];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.height = document.body.clientWidth;
      canvas.width = window.innerWidth;

      init();
    });
    class Circle {
      constructor(x, y, dx, dy, radius, maxRadius, minRadius) {
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.draw = function () {
          ctx.beginPath();
          ctx.arc(x, y, radius, 15, 60, false);
          ctx.fill();
          ctx.fillStyle = color;
          ctx.stroke();
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
    function init() {
      circleArray = [];

      for (var i = 1; i < 1000; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() * 3 + 1;
        var maxRadius = Math.random() * 70;
        var minRadius = 5;
        circleArray.push(
          new Circle(x, y, dx, dy, radius, maxRadius, minRadius)
        );
      }
    }

    init();
    const render = () => {
      requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
        circleArray[i].update();
      }
    };

    render();
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default SebSnow;
