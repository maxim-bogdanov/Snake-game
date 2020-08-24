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
let actionsToBind;

class Game {
    #gameSettings;
    newDirection = "right";
    constructor( gameSettings ){

        gameSettings = this.#gameSettings = Object.assign( {}, gameSettings );
        this.gameStep = this.gameStep.bind(this);
        const cellSize = gameSettings.cellSize || 30;

        const gameField = this.gameField = new GameField();
        const snake= this.snake = new Snake();
        this.renderer = new Renderer( gameField, snake, cellSize );

        this.initControls( gameSettings.controls );

    }

    reset(levelData){
        
        const snakeData = this.gameField.reset(
            levelData
        );

        this.snake.reset(
            snakeData
        );

        this.renderer.reset(
        )
    }

    start(gameData){

        this.reset(gameData.levelData);

        this.gameStepInterval = setInterval(this.gameStep, 300);
        this.checkActiveInterval = setInterval(this.getActiveDirection.bind(this), 33);
    }

    getActiveDirection() {
        let lastDirection;
        const bindActions = ["left", "right", "up", "down"];
        bindActions.forEach(actionName => {
            if(this.inputController.isActionActive(actionName)) {
                lastDirection = this.newDirection;
                this.newDirection = actionName;
                return;
            }
        });
        return (this.newDirection || lastDirection);
    }

    gameStep(){
        
        // Обработать инпут

        let isBonusGet = false;

        
        if( this.snake.move(this.getActiveDirection()) ){
            // если врезался сам в себя - конец игры
            this.finish();
            this.renderer.clear();
            return;

        }

        // this.gameField.addSnakeToField( this.snake );
        
        if( this.gameField.checkSnakeStep( this.snake ) ){
            // если врезался - конец игры
            this.finish();
            this.renderer.clear();
            return;
        }

        if( this.gameField.isBonusGet( this.snake ) ) {
            this.snake.doBigger();
            this.gameField.changeCoordBonus( this.snake );
        }
        

        this.renderer.render();

    }




    finish(){

        clearInterval(this.gameStepInterval);
    }

    //
    initControls( controlsSettings ){
        
        // Input Controller
        let actionsToBind = Object.assign( {}, defaultActionsToBind );
        if( controlsSettings.mouse === false ){
            actionsToBind.moveLeft.enabled = false;
            actionsToBind.moveUp.enabled = false;
            actionsToBind.moveRight.enabled = false;
            actionsToBind.moveDown.enabled = false;
        }
        this.inputController = new InputController();
        let target = window;
        this.inputController.addInputDevice( [new KeyboardInputDevice(), new GesturesInputDevice()] );
        this.inputController.bindActions(actionsToBind);
        this.inputController.attach(target);

        //


    }
}