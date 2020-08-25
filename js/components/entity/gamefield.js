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
    coordBonus = {
        x: 0,
        y: 0
    };
    totalScore = 0;
    #eventBus = window;


    reset(levelData) {
       console.log('gameField reset:', levelData);
        const field = this.field;
        const snakeData = [];
        this.fieldHeight = 0;
        this.fieldWidth = 0;
        this.totalScore = 0;


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

                    case '*': //bonus
                        this.coordBonus.x = x;
                        this.coordBonus.y = y;
                }
                if( x>this.fieldWidth) this.fieldWidth = x;
            });
            this.fieldHeight = y;
        });

        this.totalScore = snakeData.length;
        this.#eventBus.dispatchEvent(new CustomEvent('interface.changeScore', {
            detail: {
                
                score: this.totalScore
            }
        }));

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
    //    console.log('snakeDataSorted:', snakeDataSorted);
       return snakeDataSorted;

    }


    // врезалась ли змея в поле
    checkSnakeStep(snake) {
        const head = snake.snakeParts[0];

        return (this.field[head.y][head.x] === 1);
    }

    // подобрали ли бонус
    isBonusGet(snake) {
        let isBonusGet = snake.snakeParts[0].x === this.coordBonus.x
            && snake.snakeParts[0].y === this.coordBonus.y
        ;

        if (isBonusGet) {

            this.totalScore++;

            this.#eventBus.dispatchEvent(new CustomEvent('interface.changeScore', {
                detail: {
                    score: this.totalScore
                }
            }));
        }

        return isBonusGet;
    }

    // создание нового бонуса
    changeCoordBonus(snake) {
        let isBonusIntoSnake = true, isBonusIntoObstacle = true;

        let coordBonusRandom;
        while (isBonusIntoSnake || isBonusIntoObstacle) {
            coordBonusRandom = { // новые координаты бонуса
                x: this.randomInteger(0, this.fieldWidth),
                y: this.randomInteger(0, this.fieldHeight),
                // x: 6,
                // y: 3
            }

            isBonusIntoSnake = snake.snakeParts.find( (elem) => 
                elem.x == coordBonusRandom.x && elem.y == coordBonusRandom.y
            );

            isBonusIntoObstacle = this.field[coordBonusRandom.y][coordBonusRandom.x];

        }

        this.coordBonus = {
            x: coordBonusRandom.x,
            y: coordBonusRandom.y
        }
        // return coordBonus;
    }

    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }
      
}