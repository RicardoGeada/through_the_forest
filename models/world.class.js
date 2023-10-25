class World {

    backgroundObjects = this.generateBackground();

    character = new Character();
    enemies = [
        new RoboTotem(),    
        new RoboTotem(),    
        new RoboTotem(),    
    ];

    keyboard;
    canvas;
    ctx;

    camera_x = 0;

    constructor(canvas,keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear canvas at the beginning

        this.ctx.translate(-this.camera_x, 0); // translate ctx

        this.generateBackground();

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character); 

        this.ctx.translate(this.camera_x, 0); // translate ctx

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
        this.ctx.save();
        this.ctx.translate(movObj.flipH ? movObj.img.width : 0, 0);
        this.ctx.scale(movObj.flipH ? -1 : 1, 1);
        this.ctx.drawImage(movObj.img, movObj.flipH ? -movObj.x : movObj.x, movObj.y, movObj.width, movObj.height);
        this.ctx.restore();
    }

    generateBackground() {
        let background = [];
        for (let i = 0; i <  2; i++) {
          background.push(
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/6 - Distant_trees.png',i * 288,0),
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/5 - Tree_row_BG_2.png',i * 288,0),
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/4 - Tree_row_BG_1.png',i * 288,0),
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/3 - Bottom_leaf_piles.png',i * 288,0),
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/2 - Trees.png',i * 288,0),
            new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/1 - Leaf_top.png',i * 288,0),
          );
        }
        // TILES
        for (let i = 0; i < (288 / 16) * 2; i++) {
            background.push(
                new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',i * 16,192),
            );
            
        }
        return background;
    }

}