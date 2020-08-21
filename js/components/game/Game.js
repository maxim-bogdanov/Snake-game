class Game{
    
    constructor(){
        
        this.gameStep = this.gameStep.bind(this);
        //
        this.inputController = new inputController();
        const gameField = this.gameField = new GameField();
        const snake= this.snake = new Snake();
        this.renderer = new this.renderer( 30, gameField, snake );

    }

    reset(){
        this.gameField.reset(
            // количество ячеек по горизонтали,
            // количество ячеек по вертикали
        );
        this.snake.reset(
            // координата головы x,
            // координата головы y,
            // длина,
            // направление x,
            // направление y
        );
    }

    start(){
        this.reset();
        this.gameStepInterval = setInterval(this.gameStep, 1000);
    }

    gameStep(){
        
        // Обработать инпут

        if( this.snake.move( /* передать сюда инпут*/ ) ){
            // если врезался сам в себя - конец игры
        }
        
        if( this.gameField.checkSnakeStep( this.snake ) ){
            // если врезался - конец игры
        }

        this.gameField.checkBonus( this.snake );

        this.renderer.render();

    }

    finish(){
        clearInterval(this.gameStepInterval);
    }
}