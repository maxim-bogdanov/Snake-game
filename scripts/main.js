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
            '10*00000000000000001|'+
            '10000000000000000001|'+
            '10000000000000000001|'+
            '10000000000000000001|'+
            '10000000000000001111|'+
            '100000---1---0000001|'+
            '100000-0---010000001|'+
            '100000=0000000000001|'+
            '10000000000000001111|'+
            '10000000000010000001|'+
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

});