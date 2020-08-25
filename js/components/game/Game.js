const defaultActionsToBind = {
    
    left: {
        enabled: true,
        inputDevicesData:{
            "keyboard":{
                keys: [37, 65]
            },
            "gestures":{
                "gesture": "swipeLeft"
            }
        }        
    },
    up: {
        inputDevicesData:{
            "keyboard":{
                keys: [38, 87],
            },
            "gestures":{
                "gesture": "swipeUp"
            }
        }
    },
    right: {
        inputDevicesData:{
            "keyboard":{
                keys: [39, 68],
            },
            "gestures":{
                "gesture": "swipeRight"
            }
        }    
    },
    down: {
        inputDevicesData:{
            "keyboard":{
                keys: [40, 83]
            },
            "gestures":{
                "gesture": "swipeDown"
            }
        }    
        // enabled: false
    }

};
let actionsToBind;

class Game {
    #gameSettings;
    newDirection;
    curerntDirection = "right";
    isPaused = false;
    eventBus = window;
    inputActive = false;
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
        this.curerntDirection = "right";

        this.reset(gameData.levelData);

        this.gameStepInterval = setInterval(this.gameStep, gameData.levelData.speed);
    }

    gameStep(){
        
        // Обработать инпут
        if (this.isPaused) return;
    
        if( this.lastUserAction ) this.curerntDirection = this.lastUserAction;
        this.lastUserAction = undefined;
                
        if( this.gameField.checkSnakeStep( this.snake ) || this.snake.move(this.curerntDirection) ){
            // если врезался - конец игры
            this.renderer.render( true );

            this.finish( 2000 );
            setTimeout(() => {
                this.eventBus.dispatchEvent(new CustomEvent('interface.finishScreen', {
                    detail: {
                        score: this.gameField.totalScore
                    }
                }));
            }, 2000);

            return;
        }

        if( this.gameField.isBonusGet( this.snake ) ) {
            this.snake.doBigger();
            this.gameField.changeCoordBonus( this.snake );
        }
        

        this.renderer.render();

    }

    pause() {
        this.isPaused = true;
        // return this.isPaused;
    }

    resume() {
        this.isPaused = false;
        // return this.isPaused;
    }

    finish( time ){
        this.isPaused = false;

        clearInterval(this.gameStepInterval);

        setTimeout( () => {
            this.renderer.clear();
        }, time || 1);
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
        
        this.eventBus.addEventListener( InputController.ACTION_ACTIVATED, function(e){
            if( ['left','right','up','down'].indexOf(e.detail.actionName) !== -1){
                this.lastUserAction = e.detail.actionName;
            }
        }.bind(this));

    }
}


