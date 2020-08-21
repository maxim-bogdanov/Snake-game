class GameField extends Entity{
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

    // constructor(width, height) { // передаем координату начала змейки и размер дольки змейки
    //     this.#width = width;
    //     this.#height = height;

    //     this.init();
    // }

    reset(countStrings, countColumns) {
        // let countStrings = this.#height / squareSize;
        // let countColumns = this.#width / squareSize;

        countStrings += 2;
        countColumns += 2;


        // false пустое поле
        // true занятое поле
        for (let i = 0; i < countStrings; i++) {
            for (let j = 0; j < countColumns; j++) {
                let arr = [];
                arr.push(false); // пустое поле 
                this.#field.push(arr);
            }
        }
        
    }


}