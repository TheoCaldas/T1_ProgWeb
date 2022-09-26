onload = load;
var tileMap;
var snake;
var fruit;

const K = {
    screenWidth : 800,
    screenHeight : 600,
    tileSize : 10,
}

const gameField = {
    canvas: document.createElement("canvas"),
    start : function() {
        this.canvas.width = K.screenWidth
        this.canvas.height = K.screenHeight;
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
    this.type = Elements.SNAKE
    this.width = K.tileSize,
    this.height = K.tileSize,
    this.position = {
        x : 40,
        y : 30,
    },
    this.direction = Direction.Idle,
    this.body = [
        {x: 39, y: 30}
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

            tileMap.map[lastPosition.x][lastPosition.y] = Elements.MAP
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

function Fruit() {
    this.type = Elements.FRUIT
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



