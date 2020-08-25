class Renderer {

    #cellSize;
    #gameField;
    #snake;
    #canvas;
    #ctx;
    #width;
    #height;
    firstBonus = true;
    t = 1;

    constructor( gameField, snake, cellSize ){
        this.#gameField = gameField;
        this.#snake = snake;
        this.#cellSize = cellSize;
    }

    reset() {
        this.#canvas = document.getElementById("canvas");
        this.#ctx = canvas.getContext("2d");
    }

    render( isFinished ){
        //drawSnake(this.#snake);
        const cellSize = this.#cellSize;

        const fieldWidth = this.#gameField.fieldWidth;
        const fieldHeight = this.#gameField.fieldHeight;
        const coordLastBonus = this.#gameField.coordBonus;

        this.#width = fieldWidth * cellSize;
        this.#height = fieldHeight * cellSize;
        
        this.#canvas.width = this.#width + cellSize;
        this.#canvas.height = this.#height + cellSize;

        this.t = 1;


        this.drawField();

        this.drawSnake();       

        this.drawBonus();

        if ( isFinished ) {
            this.shake(this.#canvas);
        }

    }

    drawSnake() {
        const ctx = this.#ctx;
        const cellSize = this.#cellSize;
        this.#snake.snakeParts.forEach((snakePart, snakePartIndex )=>{
            ctx.fillStyle = "#00ffff";
            ctx.fillRect( snakePart.x * cellSize, snakePart.y * cellSize, cellSize, cellSize );
        });
        const head = {
            x: this.#snake.snakeParts[0].x,
            y: this.#snake.snakeParts[0].y
        }

        ctx.fillStyle = "#0000ff";
        ctx.fillRect( head.x * cellSize, head.y * cellSize, cellSize, cellSize );

    }

    drawField() {
        const ctx = this.#ctx;
        const cellSize = this.#cellSize;
        ctx.clearRect( 0,0, this.#width + cellSize, this.#height + cellSize);
        
        ctx.fillStyle = "#FF0000";
        this.#gameField.field.forEach((row,y)=>{
            row.forEach((cell,x)=>{
                if(cell !== 1) return;
                ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
            })
        })
    }

    drawBonus() {
        const coord = this.#gameField.coordBonus;
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");

        const cellSize = this.#cellSize;

        const cx = cellSize / 2 + coord.x*cellSize;
        const cy = cellSize / 2 + coord.y*cellSize;
        //Круг
        context.fillStyle = "yellow";
        context.beginPath();

        context.arc(cx, cy, Math.floor(cellSize*0.5), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = "black";
        //Левый глаз
        context.beginPath();
        context.arc(Math.floor(cellSize*0.41) + coord.x*cellSize, Math.round(cellSize*0.4) + coord.y*cellSize, Math.round(cellSize*0.06), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        //Правый глаз
        context.beginPath();
        context.arc(Math.ceil(cellSize*0.59) + coord.x*cellSize, Math.floor(cellSize*0.4) + coord.y*cellSize, Math.round(cellSize*0.06), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        //Рот
        context.beginPath();
        context.arc(cx, Math.round(cellSize*0.52) + coord.y*cellSize, Math.round(cellSize*0.26), Math.PI, 2*Math.PI, true);
        context.closePath();
        context.fill();
    }



    clear() {
        const ctx = this.#ctx;
        const cellSize = this.#cellSize;
        ctx.clearRect( 0,0, this.#width + cellSize, this.#height + cellSize);
    }

    // drawSnake(snake) {
    //     for (let segment of snake) {
    //         this.#ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    //     }
    // }



    shake() {
        let elem = this.#canvas.style;
        let amp = 7;                                   // diameter of shake                                 // current shake [0, 1]
        let step = 0.01;                               // progress step for each frame

        let a = (Math.random() * 2 - 1) * this.t;         // random angle
        let x = (Math.random() * amp * 2 - amp) * this.t; // random position, bias on x
        let y = (Math.random() * amp - amp*0.5) * this.t;
        let s = Math.max(1, 1.05 * this.t);               // scale to compens. for movement
        let b = 2 * this.t;                               // blur amount
        
        // build transform for element
        let tr = "rotate(" + a + "deg) translate(" + x + "px," + y + "px) scale(" + s + ")";
      
        elem.transform = elem.webkitTransform = tr;
        // elem.filter = "blur(" + b + "px)";
      
        this.t -= step;
        if (this.t > 0) window.requestAnimationFrame(this.shake.bind(this));
        else {
          this.t = 0;
          elem.transform = "matrix(1,0,0,1,0,0)";   // reset transforms
        //   elem.filter = "blur(0)";                  // remove blur
        }
      }
}