class World {
    level = level1;
    character = new Character();
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

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
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

    

}