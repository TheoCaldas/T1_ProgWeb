onload = load;

let snake;

gameField = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 20)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

const Direction = {
    Up : 1,
    Down : 2,
    Left : 3,
    Right : 4
}

const KeyCode = {
    LeftArrow : 37,
    UpArrow : 38,
    RightArrow : 39,
    DownArrow : 40
}

function entity(width, height, color, x, y, velocity, components) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.velocity = velocity,
    this.direction = Direction.Right
    this.components = components
    this.draw = function() {
        ctx = gameField.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.update = function() {
        for(var i = 0; i < this.components.length; i++) {
            this.components[i].update(this)
        }
    }
}

function snakeMovementComponent() {
    this.update = function(entity) {
        switch (entity.direction) {
            case Direction.Up:
                entity.y -= entity.velocity
                break
            case Direction.Down:
                entity.y += entity.velocity
                break
            case Direction.Left:
                entity.x -= entity.velocity
                break
            case Direction.Right:
                entity.x += entity.velocity
                break
        }
    }
    this.keyDownListener = function(event) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                entity.direction = Direction.Up
                break;
            case KeyCode.DownArrow:
                entity.direction = Direction.Down
                break;
            case KeyCode.LeftArrow:
                entity.direction = Direction.Left
                break;        
            case KeyCode.RightArrow:
                entity.direction = Direction.Right
                break;
        }
    }
}

function load() {
    gameField.start();
    var keyComponent = new snakeKeyListenerComponent()
    window.addEventListener('keydown', function(e) {
        keyComponent.keyDownListener(e)
    })
    snake = new entity(30, 30, "red", 10, 10, 5, [
        new snakeMovementComponent(),
    ])

}

function update() {
    snake.update()
    draw()
}

function draw() {
    gameField.clear()
    snake.draw()
}



