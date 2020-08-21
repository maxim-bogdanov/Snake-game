class Snake extends Entity{
    _type = 'snake';

    // #target;
    // #eventBus = window;
    #snake = [];
    #indexStartSnake = 0;
    #direction;
    #directionX;
    #directionY;
    #firstDirection = '';

    // constructor(length, target) {
    //     this.#length = length;
    //     this.#target = target;
    // }

    constructor(coord, direction) { // передаем координату начала змейки и размер дольки змейки
        this.#coord = coord;
        // this.#squareSize = squareSize;
        this.#direction = direction;
        this.#firstDirection = direction;
        this.init();
    }

    init() {
        super();
        this.#direction = this.#firstDirection;
        this.takeDirectionKoef();
        for (let i = 0; i < 3; i++) {
            this.#snake.push(
                {
                    x: coord.x + squareSize * i * this.#directionX,
                    y: coord.y + squareSize * i * this.#directionY
                }
            );
        }
    }

    takeDirectionKoef() {
        switch (this.#direction) {
            case 'right':
                this.#directionX = 1;
                this.#directionY = 0;
                break;
            case 'left':
                this.#directionX = -1;
                this.#directionY = 0;
                break; 
            case 'up':
                this.#directionX = 0;
                this.#directionY = -1;
                break; 
            case 'down':
                this.#directionX = 0;
                this.#directionY = 1;
                break;  
        }
    }

    move() { // движение змейки
        this.takeDirectionKoef();
        let сoordLastSquare = this.#snake[this.#snake.length - 1];

        this.#indexStartSnake += 1; // забываем о хвосте

        this.#snake.push({ // передаем новые координаты в голову
            x: сoordLastSquare.x + squareSize * this.#directionX,
            y: сoordLastSquare.y + squareSize * this.#directionY
        });
        
    }

    doBigger() { // получение бонуса

        // увеличиваем хвост
        this.#snake[this.#indexStartSnake - 1].x = this.#snake[this.#indexStartSnake].x - squareSize * this.#directionX;
        this.#snake[this.#indexStartSnake - 1].y = this.#snake[this.#indexStartSnake].y - squareSize * this.#directionY;

        this.#indexStartSnake -= 1;
    }

    changeDirection(direction) { // смена направления
        this.#direction = direction;
    }

    end() { // окончание игры
        this.#snake = [];
        this.#indexStartSnake = 0;
    }
}