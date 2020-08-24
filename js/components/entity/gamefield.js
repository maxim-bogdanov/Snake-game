class GameField extends Entity{
    type = 'field';

    // #target;
    // #eventBus = window;
    field = [];
    
    //
    #indexStartSnake = 0;
    #direction;
    #directionX;
    #directionY;
    #firstDirection = '';
    #width;
    #height;


    reset(levelData) {
       console.log('gameField reset:', levelData);
        const field = this.field;
        const snakeData = [];
        this.fieldHeight = 0;
        this.fieldWidth = 0;

        levelData.field.split('|').forEach((row,y)=>{
            if(!row) return;
            row.split('').forEach((cell,x)=>{
                // 
                if(!field[y]) field[y] = [];
                switch(cell){
                    
                    case '1': // obstacle
                    field[y][x] = 1;
                        break;

                    case '=': // snake head
                    snakeData.unshift({x,y});
                        break;

                    case '-': // snake body
                    snakeData.push({x,y});
                        break;

                }
                if( x>this.fieldWidth) this.fieldWidth = x;
            });
            this.fieldHeight = y;
        });

        // console.log( 'parsedField', this.fieldWidth, this.fieldHeight, field, snakeData );

        
        const snakeDataSorted = [];
        const snakeDataLength = snakeData.length;

        snakeDataSorted.push(snakeData[0]);
        snakeData.shift();

        while (snakeDataSorted.length != snakeDataLength) {
            const checkedPiece = snakeDataSorted[snakeDataSorted.length - 1];
            let indexDeletedElem;

            const foundPiece = snakeData.find( (elem, index) => {
                if (( checkedPiece.x === elem.x && ( (checkedPiece.y === elem.y - 1) || (checkedPiece.y === elem.y + 1) ) )
                ||
                ( checkedPiece.y === elem.y && ( (checkedPiece.x === elem.x - 1) || (checkedPiece.x === elem.x + 1) ) ))
                {
                    indexDeletedElem = index;
                    return true;
                }
            });

            snakeData[indexDeletedElem] = {};
            snakeDataSorted.push(foundPiece);
        }
       // TODO: сортировать тело змея
       console.log('snakeDataSorted:', snakeDataSorted);
       return snakeDataSorted;

    }

    // addSnakeToField(snake) {
    //     for (let segment of snake) {
    //         this.field[segment.x][segment.y] = "snake";
    //     }
    // }

    // врезалась ли змея в поле
    checkSnakeStep(snake) {
        // const head = snake[length.snake - 1];
        // return (this.#field[head.x][head.y]);
    }

    checkBonus(snake) {

    }


}