onload = load;
var entities = []
var map;
var snake;

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

const Elements = {
    MAP : 0,
    FRUIT : 1,
    SNAKE : 2,
}

function TileMap() {
    this.map = []
    this.width = 80
    this.height = 60
    this.createEmptyMap = () => {
        for(var i = 0; i < this.width; i++) {
            this.map[i] = []
            for(var j = 0; j < this.height; j++) {
                this.map[i][j] = Elements.MAP
            }
        }
    },
    this.draw = () => {
        ctx = gameField.context;
        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                ctx.fillStyle = this.getTileColor(this.map[i][j])
                var x = 800/this.width * i;
                var y = 600/this.height * j;
                ctx.fillRect(x, y, 10, 10);
            }
        }
    },
    this.getTileColor = (type) => {
        switch(type) {
            case Elements.MAP:
                return 'green'
            case Elements.FRUIT:
                return 'yellow'
            case Elements.SNAKE:
                return 'blue'
        }
    }
}

function Snake() {
    this.type = Elements.SNAKE
    this.width = 10,
    this.height = 10,
    this.position = {
        x : 40,
        y : 30,
    },
    this.direction = Direction.Right,
    this.body = [
        {x: 39, y: 30},
        {x: 38, y: 30},
        {x: 37, y: 30}
    ],
    this.load = function() {
        onkeydown = (event) => {
            this.keyDownListener(event)
        }
    },
    this.update = function() {
            var lastPosition = { x: this.position.x, y: this.position.y};
            switch (this.direction) {
                case Direction.Idle: break;
                case Direction.Up: this.position.y -= 1; break;
                case Direction.Down: this.position.y += 1; break;
                case Direction.Left: this.position.x -= 1; break;
                case Direction.Right: this.position.x += 1; break;
            }

            //check map colision
            if(this.position.x < 0 || this.position.x > 79 || this.position.y < 0 || this.position.y > 59) {
                this.position = lastPosition
                return
            }

            //check fruit collision
            if (map.map[this.position.x][this.position.y] == Elements.FRUIT) {
                this.body.push(lastPosition)
            }

            this.body.unshift(lastPosition)
            var aux = this.body.pop()
            map.map[aux.x][aux.y] = Elements.MAP

            this.body.forEach((tile) => {
                map.map[tile.x][tile.y] = Elements.SNAKE 
            })

            map.map[lastPosition.x][lastPosition.y] = Elements.MAP
            map.map[this.position.x][this.position.y] = Elements.SNAKE

    },
    this.keyDownListener = function(event) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                this.direction = Direction.Up
                break;
            case KeyCode.DownArrow:
                this.direction = Direction.Down
                break;
            case KeyCode.LeftArrow:
                this.direction = Direction.Left
                break;        
            case KeyCode.RightArrow:
                this.direction = Direction.Right
                break;
        }
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

function load() {
    gameField.start();
    map = new TileMap()
    snake = new Snake()
    snake.load()
    map.createEmptyMap()
}

function update() {
    snake.update()
    draw()
}

function draw() {
    gameField.clear()
    map.draw()
}



