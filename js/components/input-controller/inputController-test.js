let actionsToBind = {
    
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

let target = window;
let eventBus = window;



// CONTROLLER INITIALIZATION
const inputController = new InputController();
inputController.addInputDevice( [new KeyboardInputDevice(), new GesturesInputDevice()] );
inputController.bindActions(actionsToBind);
inputController.attach(target);


///

let squareSize = 50;
const bonus = new Bonus();
bonus.init(squareSize);
let outR = squareSize / 2;
let innR = outR / 2;
bonus.draw({x:100, y:200});

///

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