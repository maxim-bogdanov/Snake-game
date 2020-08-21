addEventListener('onDOMLoaded',()=>{
    
    const game = new Game();

    $startButton = $('#start-button');
    $startButton.on('click', game.start );
    
});