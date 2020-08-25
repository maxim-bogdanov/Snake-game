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
            '100000---10000000001|'+
            '100000-0--0010000001|'+
            '100000=0000000000001|'+
            '10000000000000001111|'+
            '10000000000010000001|'+
            '10010000010000000001|'+
            '10000000001000000001|'+
            '10000000000000001111|'+
            '10000000001000000001|'+
            '10100000000000000111|'+
            '10000000000000000101|'+
            '11111111111111111111|',
            bonuses: [],
            speed: 150
        }
    ]

    const gameSettings = {
        controls: {
            keyboard: [30, 31, 32, 33],
            // mouse: false
        },
        cellSize: 25
    };

    // let target = window;
    let eventBus = window;    
    
    const game = new Game( gameSettings );

    // экран менюхи
    const $menu = document.getElementsByClassName('menu')[0];
    $menu.classList.add('visible');

    // экран игры
    const $play = document.getElementsByClassName('play')[0];
    const $startBtn = document.getElementById('startBtn');
    $startBtn.addEventListener('click', () => {
        $menu.classList.remove('visible');
        $play.classList.add('visible');
        game.start({
            levelData: levelsData[0]
        });
    });

    const $pauseBtn = document.getElementById('pauseBtn');
    const $pause = document.getElementsByClassName('pause')[0];
    const $pauseWrap = document.getElementsByClassName('wrapper-pause')[0]; 
    $pauseBtn.addEventListener('click', () => {
        game.pause();
        $pause.classList.add('visible');

        $play.classList.add('playPaused');
        $pauseWrap.classList.add('visible');

        const widthCanvas = document.getElementById('canvas').width;
        const heightCanvas = document.getElementById('canvas').height;

        $pause.style.width = widthCanvas * 0.75 + "px";
        $pause.style.height = heightCanvas * 0.75 + "px";
    });

    const $resumeBtn = document.getElementById('resumeBtn');
    $resumeBtn.addEventListener('click', () => {
        game.resume();
        $pause.classList.remove('visible');
        $pauseWrap.classList.remove('visible');
    });

    const $stopBtn = document.getElementById('stopBtn');
    $stopBtn.addEventListener('click', () => {
        game.finish();
        $pause.classList.remove('visible');
        $play.classList.remove('visible');
        $menu.classList.add('visible');
        $pauseWrap.classList.remove('visible');
    });

    const $finish = document.getElementsByClassName('finish')[0];

    eventBus.addEventListener( 'interface.changeScore', function(e){
        Array.from(document.getElementsByClassName('score')).forEach( (node) =>
            node.innerHTML = e.detail.score
        )
    });

    eventBus.addEventListener( 'interface.finishScreen', function(e){
        $finish.classList.add('visible');
        $play.classList.remove('visible')
    });

    const $playAgainBtn = document.getElementById('playAgainBtn');
    $playAgainBtn.addEventListener('click', () => {
        $finish.classList.remove('visible');
        $play.classList.add('visible');
        game.finish();
        game.start({
            levelData: levelsData[0]
        });
    });

    
    const $newGameBtn = document.getElementById('newGameBtn');
    $newGameBtn.addEventListener('click', () => {
        game.finish();
        $finish.classList.remove('visible');
        $menu.classList.add('visible');
    });


    eventBus.addEventListener('game.finish', ()=>{
        console.log('game finished');
    });

});