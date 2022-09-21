onload = load;

var snake;

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

function entity(width, height, color, x, y, components) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = Direction.Right
    this.components = components
    this.draw = function() {
        ctx = gameField.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.update = function() {
        for(i = 0; i < this.components.length; i++) {
            this.components[0].update(this)
        }
    }
}

function snakeMovementComponent() {
    this.update = function(entity) {
        switch (entity.direction) {
            case Direction.Up:
                entity.y -= 1
                break
            case Direction.Down:
                entity.y += 1
                break
            case Direction.Left:
                entity.x -= 1
                break
            case Direction.Right:
                entity.x += 1
                break
        }
    }
}

function load() {
    gameField.start();
    snake = new entity(30, 30, "red", 10, 10, [
        new snakeMovementComponent()
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



