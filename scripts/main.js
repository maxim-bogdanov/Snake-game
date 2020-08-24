addEventListener('DOMContentLoaded',()=>{
    
    // !!! >>> generate level
    var w = 20;
    var s='';
    for(var y=0; y<w; y++){
        for(var x=0; x<w; x++){
            if(y===0 || y===w-1) s+='1';
            else if( x===0 || x===w-1 ) s+='1';
            else {
                if( Math.random()>.95) s+='1';
                else s+= '0';
            }
        }
        s+='|';
    }
    console.log(s);
    // !!! <<<
    const levelsData = [
        {
            field:
            '11111111111111111111|'+
            '10000000000100000001|'+
            '10000000000100000001|'+
            '10000000000000000001|'+
            '10000000000000000001|'+
            '10000000000000000001|'+
            '10000000000000000001|'+
            '10000000000000001111|'+
            '100000---1---0000001|'+
            '100000-0---010000001|'+
            '100000=0000000000001|'+
            '10000000000000001111|'+
            '10000000000000000001|'+
            '10010000010000000001|'+
            '10000000001000000001|'+
            '10000000000000001111|'+
            '10000000001000000001|'+
            '10100000000000000011|'+
            '10000000000000000001|'+
            '11111111111111111111|',
            bonuses: []
        }
    ]

    const gameSettings = {
        controls: {
            keyboard: [30, 31, 32, 33],
            mouse: false
        },
        cellSize: 25
    };

    // let target = window;
    let eventBus = window;    
    
    const game = new Game( gameSettings );

    // buttonStart.addEventListener('click',()=>{
        game.start({
            levelData: levelsData[0]
        });
    // });

    eventBus.addEventListener('game.finish', ()=>{
        console.log('game finished');
    });
    
    // CONTROLLER INITIALIZATION
    // const inputController = new InputController();
    // inputController.addInputDevice( [new KeyboardInputDevice(), new GesturesInputDevice()] );
    // inputController.bindActions(actionsToBind);
    // inputController.attach(target);
    
    
    /// !!! >>>
    
    // let squareSize = 50;
    // const bonus = new Bonus();
    // bonus.init(squareSize);
    // let outR = squareSize / 2;
    // let innR = outR / 2;
    // bonus.draw({x:100, y:200});
    
    /// !!! <<<
    
    /*
    
    
    
    // eventBus.addEventListener( InputController.ACTION_ACTIVATED, function(e){
    //     console.log('action activated:', e.detail );
    //     moveHero(hero, e.detail.actionName);
    //     // проверяем какая активность сработала и применяем к герою
    // });
    
    // eventBus.addEventListener( InputController.ACTION_DEACTIVATED, function(e){
    //     console.log('action deactivated:', e.detail );
    //     // проверяем какая активность сработала и применяем к герою
    // });
    
    
    setInterval(function(){
        const bindActions = inputController.getBindActions;
        Object.keys(bindActions).forEach(actionName => {
            if(inputController.isActionActive(actionName)){
                moveHero(hero, actionName);
            }
        });
    }, 33 );
    
    */
    
});