class Snake extends Entity{
    _type = 'snake';

    #length;
    // #target;
    // #eventBus = window;
    snake = [];
    #direction;
    #directionX;
    #directionY;

    // constructor(length, target) {
    //     this.#length = length;
    //     this.#target = target;
    // }

    // constructor() { 
    //     this.reset();
    // }

    directions = {
        "right": {x:1,y:0, reverse: "left"},
        "left": {x:-1,y:0, reverse: "right"},
        "up": {x:0,y:-1, reverse: "down"},
        "down": {x:0,y:1, reverse: "up"}
    }


    reset(head, length, direction) { // передаем координату головы змейки, длину и направление
        this.#head = head;
        this.#length = length;
        this.#direction = direction;

        this.#directionX = directions[this.#direction].x;
        this.#directionY = directions[this.#direction].y;

        // чтобы в массиве последним элементом была голова
        this.#tail = {
            x: head.x - length * squareSize * (-this.#directionX),
            y: head.y - length * squareSize * (-this.#directionY)
        }

        this.#snake.push(tail);

        for (let i = 1; i < this.#length; i++) {
            this.#snake.push(
                {
                    x: this.#tail.x + squareSize * i * this.#directionX,
                    y: this.#tail.y + squareSize * i * this.#directionY
                }
            );
        }
    }


    move( newDirection ) { // движение змейки

        // нажатие не в сторону обратного движения
        if (!(directions[newDirection].reverse == this.#direction)) 
            this.#direction = newDirection;

        // новое пользовательское направление
        this.#directionX = directions[this.#direction].x;
        this.#directionY = directions[this.#direction].y;

        this.#head = this.#snake[this.#snake.length - 1];

        const newHead = this.#snake.shift();
        newHead.x = this.#head.x + squareSize * this.#directionX;
        newHead.y = this.#head.y + squareSize * this.#directionY;
        this.#snake.push(newHead);


        // врезался в себя
        if (this.#snake.find( (segment) => (newHead.x == segment.x && newHead.y == segment.y) )) return true;

        return false; // если все ок

    }

    doBigger() { // получение бонуса

        // увеличиваем хвост
        this.#snake.unshift( 
            {
                x: this.#snake[0].x - squareSize * this.#directionX,
                y: this.#snake[0].y - squareSize * this.#directionY
            }
        );
        
    }

    // changeDirection(direction) { // смена направления
    //     this.#direction = direction;
    // }

    // end() { // окончание игры
    //     this.#snake = [];
    //     this.#indexStartSnake = 0;
    // }
}