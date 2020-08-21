const defaultActionsToBind = {
    
    left: {
        enabled: true,
        inputDevicesData:{
            "keyboard":{
                keys: [37, 65]
            }
        }        
    },
    up: {
        inputDevicesData:{
            "keyboard":{
                keys: [38, 87],
            }
        }
    },
    right: {
        inputDevicesData:{
            "keyboard":{
                keys: [39, 68],
            }
        }    
    },
    down: {
        inputDevicesData:{
            "keyboard":{
                keys: [40, 83]
            }
        }    
        // enabled: false
    },


    moveLeft: {
        enabled: true,
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeLeft"
            }
        }    
    },
    moveUp: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeUp"
            }
        }    
    },
    moveRight: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeRight"
            }
        }    
    },
    moveDown: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeDown"
            }
        }
    }

};

class Game{
    #gameSettings;
    constructor( gameSettings ){

        gameSettings = this.#gameSettings = Object.assign( {}, gameSettings );
        this.gameStep = this.gameStep.bind(this);
        //
        
        const gameField = this.gameField = new GameField();
        const snake= this.snake = new Snake();
        this.renderer = new Renderer( gameField, snake );

        this.initControls( gameSettings.controls );

    }

    reset(levelData){
        
        const snakeData = this.gameField.reset(
            levelData
        );

        this.snake.reset(
            snakeData
            // this.#gameSettings.headCoord,
            // this.#gameSettings.snakeLength,
            // this.#gameSettings.direction
            // длина,
            // направление,
        );

        this.renderer.reset(
            // this.#gameSettings.cellSize || 30,
            // this.gameField,
            // this.snake
            // размер ячейки
            // игровое поле
            // змея
        )
    }

    start(gameData){

        this.reset(gameData.levelData);

        this.gameStepInterval = setInterval(this.gameStep, 1000);

    }

    gameStep(){
        
        // Обработать инпут

/*
        if( this.snake.move("right") ){
            // если врезался сам в себя - конец игры
        }

        // this.gameField.addSnakeToField( this.snake );
        
        if( this.gameField.checkSnakeStep( this.snake ) ){
            // если врезался - конец игры
        }

        if( this.gameField.checkBonus( this.snake ) ) {
            this.snake.doBigger();
        }
        */

        this.renderer.render();

    }

    finish(){
        clearInterval(this.gameStepInterval);
    }

    //
    initControls( controlsSettings ){
        
        // Input Controller
        const actionsToBind = Object.assign( {}, defaultActionsToBind );
        if( controlsSettings.mouse === false ){
            actionsToBind.moveLeft.enabled = false;
            actionsToBind.moveUp.enabled = false;
            actionsToBind.moveRight.enabled = false;
            actionsToBind.moveDown.enabled = false;
        }
        this.inputController = new InputController( actionsToBind, window );

        //


    }
}