class Renderer {

    #cellSize;
    #gameField;
    #snake;
    #canvas;
    #ctx;
    #width;
    #height;

    constructor( gameField, snake, cellSize ){
        this.#gameField = gameField;
        this.#snake = snake;
        this.#cellSize = cellSize;
    }

    reset() {
        this.#canvas = document.getElementById("canvas");
        this.#ctx = canvas.getContext("2d");
    }

    render(){
        //drawSnake(this.#snake);
        const cellSize = this.#cellSize;

        this.#width = this.#gameField.fieldWidth * cellSize;
        this.#height = this.#gameField.fieldHeight * cellSize;
        
        this.#canvas.width = this.#width + cellSize;
        this.#canvas.height = this.#height + cellSize;

        const ctx = this.#ctx;
        // draw Field
        ctx.clearRect( 0,0, this.#width, this.#height);
        
        ctx.fillStyle = "#FF0000";
        this.#gameField.field.forEach((row,y)=>{
            row.forEach((cell,x)=>{
                if(!cell) return;
                ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
            })
        })

        // draw Snake
        this.#snake.snakeParts.forEach((snakePart, snakePartIndex )=>{
            ctx.fillStyle = snakePartIndex==0 ? "#0000ff" : "#00ffff";
            ctx.fillRect( snakePart.x * cellSize, snakePart.y * cellSize, cellSize, cellSize );

            ctx.fillStyle = '#000000';
            ctx.font = "20px Tahoma";
            ctx.fillText(snakePartIndex, snakePart.x * cellSize + cellSize/2, snakePart.y * cellSize + cellSize/2 );

        });
  
    }

    // drawSnake(snake) {
    //     for (let segment of snake) {
    //         this.#ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    //     }
    // }
}