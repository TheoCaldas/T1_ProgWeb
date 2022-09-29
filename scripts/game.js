onload = load;
var tileMap;
var snake;
var fruit;

const K = new GameSettings("easy");

function GameSettings(difficulty){
    this.screenWidth = 800;
    this.screenHeight = 600;

    switch(difficulty){
        case "easy":
            this.tileSize = 20;
            this.snakeInitialPos = {x : 10, y : 10};
            this.speed = 20;
            break;
        case "normal":
            this.tileSize = 15;
            this.snakeInitialPos = {x : 20, y : 20};
            this.speed = 30;
            break;
        case "hard":
            this.tileSize = 10;
            this.snakeInitialPos = {x : 30, y : 30};
            this.speed = 40;
            break;
        default:
            break;
    }
}

const gameField = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = K.screenWidth
        this.canvas.height = K.screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 1000/K.speed)
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
    DownArrow : 40,
    W : 87,
    A : 65,
    S : 83,
    D : 68,
}

function TileMap() {
    this.map = []
    this.width = K.screenWidth/K.tileSize
    this.height = K.screenHeight/K.tileSize
    this.load = () => {
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
                var x = K.tileSize * i;
                var y = K.tileSize * j;
                ctx.fillRect(x, y, K.tileSize, K.tileSize);
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
    this.width = K.tileSize,
    this.height = K.tileSize,
    this.position = K.snakeInitialPos,
    this.direction = Direction.Idle,
    this.body = [],
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
            if(this.gameHasEnded()) {
                this.position = lastPosition
                return
            }

            //check fruit collision
            if (this.fruitWasHitted()) {
                this.body.push(lastPosition)
                fruit.spawn()
            }

            this.body.unshift(lastPosition)
            var aux = this.body.pop()
            tileMap.map[aux.x][aux.y] = Elements.MAP

            this.body.forEach((tile) => {
                tileMap.map[tile.x][tile.y] = Elements.SNAKE 
            })

            tileMap.map[this.position.x][this.position.y] = Elements.SNAKE
    },
    this.gameHasEnded = () => {
        var minX = 0; var maxX = K.screenWidth/K.tileSize - 1;
        var minY = 0; var maxY = K.screenHeight/K.tileSize - 1; 
        return this.position.x < minX ||
               this.position.x > maxX ||
               this.position.y < minY || 
               this.position.y > maxY ||
               tileMap.map[this.position.x][this.position.y] == Elements.SNAKE
    },
    this.fruitWasHitted = () => {
        return tileMap.map[this.position.x][this.position.y] == Elements.FRUIT
    },
    this.keyDownListener = (event) => {
        switch (event.keyCode) {
            case KeyCode.UpArrow || KeyCode.W:
                this.direction = Direction.Up
                break;
            case KeyCode.DownArrow || KeyCode.S:
                this.direction = Direction.Down
                break;
            case KeyCode.LeftArrow || KeyCode.A:
                this.direction = Direction.Left
                break;        
            case KeyCode.RightArrow || KeyCode.D:
                this.direction = Direction.Right
                break;
        }
    }
}

function Fruit() {
    this.width = K.tileSize,
    this.height = K.tileSize,
    this.spawn = () => {
        var x;
        var y;
        while(true) {
            x = Math.floor(Math.random() * K.screenWidth/K.tileSize)
            y = Math.floor(Math.random() * K.screenHeight/K.tileSize)
            if(tileMap.map[x][y] == Elements.MAP) break;
        }
        tileMap.map[x][y] = Elements.FRUIT
    }
}

function load() {
    gameField.start();
    tileMap = new TileMap()
    snake = new Snake()
    fruit = new Fruit()
    tileMap.load()
    snake.load()
    fruit.spawn()
}

function update() {
    snake.update()
    draw()
}

function draw() {
    gameField.clear()
    tileMap.draw()
}



