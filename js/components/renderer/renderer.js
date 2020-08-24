class Renderer {

    #cellSize;
    #gameField;
    #snake;
    #canvas;
    #ctx;
    #width;
    #height;
    firstBonus = true;

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

        const fieldWidth = this.#gameField.fieldWidth;
        const fieldHeight = this.#gameField.fieldHeight;
        const coordLastBonus = this.#gameField.coordBonus;

        this.#width = fieldWidth * cellSize;
        this.#height = fieldHeight * cellSize;
        
        this.#canvas.width = this.#width + cellSize;
        this.#canvas.height = this.#height + cellSize;


        this.drawField();

        this.drawSnake();

       

        this.drawBonus();

    }

    drawSnake() {
        const ctx = this.#ctx;
        const cellSize = this.#cellSize;
        this.#snake.snakeParts.forEach((snakePart, snakePartIndex )=>{
            ctx.fillStyle = snakePartIndex == 0 ? "#0000ff" : "#00ffff";
            ctx.fillRect( snakePart.x * cellSize, snakePart.y * cellSize, cellSize, cellSize );

            ctx.fillStyle = '#000000';
            ctx.font = "20px Tahoma";
            ctx.fillText(snakePartIndex, snakePart.x * cellSize + cellSize/2, snakePart.y * cellSize + cellSize/2 );
        });
    }

    drawField() {
        const ctx = this.#ctx;
        const cellSize = this.#cellSize;
        ctx.clearRect( 0,0, this.#width, this.#height);
        
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
        this.#ctx.clearRect( 0,0, this.#width, this.#height);
    }

    // drawSnake(snake) {
    //     for (let segment of snake) {
    //         this.#ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    //     }
    // }
}