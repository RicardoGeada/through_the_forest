class World {

    backgroundObjects = [
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/6 - Distant_trees.png',0,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/5 - Tree_row_BG_2.png',0,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/4 - Tree_row_BG_1.png',0,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/3 - Bottom_leaf_piles.png',0,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/2 - Trees.png',0,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/1 - Leaf_top.png',0,0),
        // GROUND TILES
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',0,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',16,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',32,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',48,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',64,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',70,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',86,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',92,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',108,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',124,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',140,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',156,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',172,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',188,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',204,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',220,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',236,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',252,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',268,192),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',284,192),
    ];
    character = new Character();
    enemies = [
        new RoboTotem(),    
        new RoboTotem(),    
        new RoboTotem(),    
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

        this.keyListener();
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear canvas at the beginning

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character); 

        let self = this;
        requestAnimationFrame(function() {  
            self.draw();
        });
    }

    addObjectsToMap(objs) {
        objs.forEach(obj => {
            this.addToMap(obj);
        })
    }

    addToMap(movObj) {
        this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);
    }

    keyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowRight') {
                this.character.moveRight();
            }
            if (e.key == 'ArrowLeft') {
                this.character.moveLeft();
            }
        })
    }
}