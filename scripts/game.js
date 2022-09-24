onload = load;
var entities = []

gameField = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 30)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

const Direction = {
    Idle : 0,
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

const Components = {
    SnakeBody : 0,
    SnakeMovement : 1,
    Collider : 2
}

const Entities = {
    Snake : 'Snake',
    Fruit : 'Fruit'
}

function Entity(name, width, height, color, x, y, velocity) {
    this.name = name,
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.velocity = velocity,
    this.direction = Direction.Right
    this.components = []
    this.body = []
    this.draw = function() {
        ctx = gameField.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.body.forEach((entity) => {
            entity.draw()
        })
    }
    this.update = function() {
        for(var i = 0; i < this.components.length; i++) {
            this.components[i].update(this)
        }
    }
    this.addComponent = function(component) {
        component.load()
        this.components.push(component)
    }
    this.removeComponent = function(name) {
        this.components = this.components.filter(componet => componet.name == name)
    },
    this.hasComponent = function(name) {
        var hasComponent = false
        this.components.forEach((component) => {
            if(component.name == name) {
                hasComponent = true
            }
        })
        return hasComponent
    },
    this.getComponent = function(name) {
        return this.components.filter(componet => componet.name == name)[0]
    }
}

function snakeMovementComponent(name, entity) {
    this.name = name,
    this.entity = entity,
    this.load = function() {
        onkeydown = (event) => {
            this.keyDownListener(event)
        }
    },
    this.update = function() {
        var auxX = this.entity.x
        var auxY = this.entity.y
        switch (this.entity.direction) {
            case Direction.Idle:
                break;
            case Direction.Up:
                this.entity.y -= this.entity.velocity
                break
            case Direction.Down:
                this.entity.y += this.entity.velocity
                break
            case Direction.Left:
                this.entity.x -= this.entity.velocity
                break
            case Direction.Right:
                this.entity.x += this.entity.velocity
                break
        }
        var x = new Entity('', 20, 20, 'blue', auxX, auxY, snake.velocity)
        this.entity.body.unshift(x)
        this.entity.body.pop()
    }
    this.keyDownListener = function(event) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                this.entity.direction = Direction.Up
                break;
            case KeyCode.DownArrow:
                this.entity.direction = Direction.Down
                break;
            case KeyCode.LeftArrow:
                this.entity.direction = Direction.Left
                break;        
            case KeyCode.RightArrow:
                this.entity.direction = Direction.Right
                break;
        }
    }
}

function snakeBodyComponent(name, entity) {
    this.name = name,
    this.entity = entity
    this.body = []
    this.load = function() {}
    this.update = function() {
        this.body.forEach((tile) => {
            this.moveBody()
            tile.draw()
        })
    }
    this.moveBody = function(newPosition) {
        this.body.unshift(new entity(Entities.Fruit, 20, 20, "black", 200, 200, 0))
        this.body.pop()
    },
    this.addTile = function() {
        var newTile = 
        this.body.push(new entity(Entities.Fruit, 20, 20, "black", 200, 200, 0))
    }

}

function colliderComponent(name, entity, type, onCollision) {
    this.name = name,
    this.entity = entity,
    this.type = type
    this.onCollision = onCollision,
    this.load = function() {},
    this.update = function() {
        entities.forEach((e) => {
            if(this.checkCollisionWith(e) && e.hasComponent(Components.Collider)) {
                this.onCollision()
            }
        })
    },
    this.checkCollisionWith = function(entity) {
        if(this.entity == entity) return false;
        return this.entity.x < entity.x + entity.width &&
               entity.x < this.entity.x + this.entity.width &&
               this.entity.y < entity.y + entity.height &&
               entity.y < this.entity.y + this.entity.height
    }
}

function load() {
    gameField.start();
    snake = new Entity(Entities.Snake, 30, 30, "red", 10, 10, 20)
    fruit = new Entity(Entities.Fruit, 20, 20, "black", 200, 200, 0)
    snake.addComponent(new snakeMovementComponent(Components.SnakeMovement, snake))
    snake.addComponent(new snakeBodyComponent(Components.SnakeBody, snake))
    snake.addComponent(new colliderComponent(Components.Collider, snake, 'snake', () => {
        snake.body.push(new Entity('', 20, 20, 'blue', snake.x, snake.y, snake.velocity))
    }))
    fruit.addComponent(new colliderComponent(Components.Collider, fruit, 'fruit', () => {

    }))

    entities.push(snake)
    entities.push(fruit)
}

function update() {
    entities.forEach((entity) => {
        entity.update()
    })
    draw()
}

function draw() {
    gameField.clear()
    entities.forEach((entity) => {
        entity.draw()
    })
}



