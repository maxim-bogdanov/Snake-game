class Snake extends Entity{
    _type = 'snake';

    #length;
    // #target;
    // #eventBus = window;
    snakeParts = [];
    #direction;
    #directionX;
    #directionY;
    #currentDirection;


    directions = {
        "right": {x:1,y:0, reversed: "left"},
        "left": {x:-1,y:0, reversed: "right"},
        "up": {x:0,y:-1, reversed: "down"},
        "down": {x:0,y:1, reversed: "up"}
    }


    reset(snakeData){
        // console.log('Snake.reset:', snakeData );
        this.snakeParts.length = 0;
        snakeData.forEach((snakePiece)=>{
            this.snakeParts.push({
                x: snakePiece.x,
                y: snakePiece.y
            });
        });
        // console.log('snakeParts',this.snakeParts);
    }


    lastTailPosition = {x:0,y:0};
    
    move( newDirection ) { // движение змейки

        // нажатие не в сторону обратного движения
        if (!(this.directions[newDirection].reversed === this.#currentDirection)) 
            this.#currentDirection = newDirection;

        // новое пользовательское направление

        const head = this.snakeParts[0];
        
        const tail = this.snakeParts.pop();
        this.lastTailPosition.x = tail.x;
        this.lastTailPosition.y = tail.y;
        tail.x = head.x + this.directions[this.#currentDirection].x;
        tail.y = head.y + this.directions[this.#currentDirection].y;
        
        this.snakeParts.unshift(tail); // добавить перед головой в новой позиции

        // врезался в себя
        if (this.snakeParts.find( (segment, index) => (index !== 0 && this.snakeParts[0].x == segment.x && this.snakeParts[0].y == segment.y) )) {
            console.log('врезался!');
            return true;
        }



        return false; // если все ок

    }

    doBigger() { // получение бонуса

        this.snakeParts.push({
            x: this.lastTailPosition.x,
            y: this.lastTailPosition.y
        });
    }
}