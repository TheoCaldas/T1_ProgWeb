onload = load;
var tileMap;
var snake;
var fruit;
var score = 0;

const K = new GameSettings(getDifficulty());

function getDifficulty(){
    var searchString = window.location.search;
    var a = searchString.split('difficultyField=');
    return a[1];
}

function GameSettings(difficulty) {
    this.screenWidth = 800;
    this.screenHeight = 600;

    switch(difficulty){
        case "easy":
            this.tileSize = 40;
            this.snakeInitialPos = {x : 10, y : 10};
            this.speed = 10;
            break;
        case "normal":
            this.tileSize = 30;
            this.snakeInitialPos = {x : 20, y : 20};
            this.speed = 20;
            break;
        case "hard":
            this.tileSize = 20;
            this.snakeInitialPos = {x : 30, y : 30};
            this.speed = 30;
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
        document.getElementById("gameField").appendChild(this.canvas);
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
    SNAKE_HEAD : 2,
    SNAKE_BODY : 3
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
                var img = this.getTileAsset(this.map[i][j])
                var x = K.tileSize * i;
                var y = K.tileSize * j;
                ctx.drawImage(img, x, y, K.tileSize, K.tileSize);
            }
        }
    },

    this.getTileAsset = (type) => {
        switch(type) {
            case Elements.MAP:
                return document.getElementById("mapTile");
            case Elements.FRUIT:
                return document.getElementById("fruit");
            case Elements.SNAKE_HEAD:
                return document.getElementById("snakeHeadAsset");
            case Elements.SNAKE_BODY:
                return document.getElementById("snakeBodyAsset");
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
                gameField.stop();
                return
            }

            //check fruit collision
            if (this.fruitWasHitted()) {
                this.scores();
                this.body.push(lastPosition)
                fruit.spawn()
            }

            this.body.unshift(lastPosition)
            var aux = this.body.pop()
            tileMap.map[aux.x][aux.y] = Elements.MAP

            this.body.forEach((tile) => {
                tileMap.map[tile.x][tile.y] = Elements.SNAKE_BODY 
            })

            tileMap.map[this.position.x][this.position.y] = Elements.SNAKE_HEAD
    },
    this.gameHasEnded = () => {
        var minX = 0; var maxX = K.screenWidth/K.tileSize - 1;
        var minY = 0; var maxY = K.screenHeight/K.tileSize - 1; 
        return this.position.x < minX ||
               this.position.x > maxX ||
               this.position.y < minY || 
               this.position.y > maxY ||
               tileMap.map[this.position.x][this.position.y] == Elements.SNAKE_BODY
    },
    this.fruitWasHitted = () => {
        return tileMap.map[this.position.x][this.position.y] == Elements.FRUIT
    },
    this.scores = () => {
        score++;
        document.getElementById("scoreTitle").innerHTML = "PONTOS: " + score;
    }
    this.keyDownListener = (event) => {
        if ((event.keyCode == KeyCode.UpArrow || event.keyCode == KeyCode.W) && this.direction != Direction.Down) 
            this.direction = Direction.Up;
        else if ((event.keyCode == KeyCode.DownArrow || event.keyCode == KeyCode.S) && this.direction != Direction.Up) 
            this.direction = Direction.Down;
        else if ((event.keyCode == KeyCode.LeftArrow || event.keyCode == KeyCode.A) && this.direction != Direction.Right)
            this.direction = Direction.Left;
        else if ((event.keyCode == KeyCode.RightArrow || event.keyCode == KeyCode.D) && this.direction != Direction.Left)
            this.direction = Direction.Right;
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



