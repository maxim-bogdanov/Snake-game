class Bonus extends Entity {

    _type = 'bonus';
    
    // #squareSize = 0;

    // constructor(squareSize) { // передаем размер квадратика
    //     super();
    //     this.#squareSize = squareSize;
    // }


    #canvas = document.getElementById("canvas");
    #ctx = canvas.getContext("2d");

    draw(coord) {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let size = this.squareSize;
        let cx = size / 2 + coord.x;
        let cy = size / 2 + coord.y;
        //Круг
        context.fillStyle = "yellow";
        context.beginPath();

        context.arc(cx, cy, Math.floor(size*0.5), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = "black";
        //Левый глаз
        context.beginPath();
        context.arc(Math.floor(size*0.41) + coord.x, Math.round(size*0.4) + coord.y, Math.round(size*0.06), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        //Правый глаз
        context.beginPath();
        context.arc(Math.ceil(size*0.59) + coord.x, Math.floor(size*0.4) + coord.y, Math.round(size*0.06), 0, 2*Math.PI);
        context.closePath();
        context.fill();
        //Рот
        context.beginPath();
        context.arc(cx, Math.round(size*0.52) + coord.y, Math.round(size*0.26), Math.PI, 2*Math.PI, true);
        context.closePath();
        context.fill();
    }

    delete() {
        this.#ctx.clearRect(coord.x, coord.y, this.#canvas.width, this.#canvas.height);
    }
}