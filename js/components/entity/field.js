class Field extends Entity{
    type = 'field';

    // #target;
    // #eventBus = window;
    #field = [];
    #indexStartSnake = 0;
    #direction;
    #directionX;
    #directionY;
    #firstDirection = '';
    #width;
    #height;

    // constructor(length, target) {
    //     this.#length = length;
    //     this.#target = target;
    // }

    constructor(width, height) { // передаем координату начала змейки и размер дольки змейки
        this.#width = width;
        this.#height = height;

        this.init();
    }

    init() {
        super();
        let countStrings = this.#height / squareSize;
        let countColumns = this.#width / squareSize;

        for (let i = 0; i < countStrings; i++) {
            for (let j = 0; j < countColumns; j++) {
                
            }
        }
        this.#field[]
    }


}