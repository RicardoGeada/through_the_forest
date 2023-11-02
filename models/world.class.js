class World {
    level = level1;
    character = new Character();
    healthbar = new HealthBar();
    throwableObjects = [];
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
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.healthbar.world = this;
        this.throwableObjects.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hitBy(enemy);
                    console.log(this.character.hp);
                };
            });
        }, 1000);
        setInterval(() => {
            this.throwableObjects.forEach((obj) => { // Added 'index' parameter
                if (obj instanceof ThrowableObject) {
                    this.level.enemies.forEach((enemy) => {
                        if (obj.isColliding(enemy) && !obj.dead) {
                            let index = this.throwableObjects.indexOf(obj); // Get the index of 'obj'
                            enemy.hitBy(obj);
                            console.log('enemy hp:',enemy.hp);
                            obj.dead = true;
                            clearInterval(obj.throwInterval);
                            clearInterval(obj.gravityInterval);
                            obj.explode();
                            setTimeout(() => {
                                this.throwableObjects.splice(index,1);
                            }, 250);
                        }
                    });
                   
                }
            });
        }, 1000 / 25);
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear canvas at the beginning

        this.ctx.translate(-this.camera_x, 0); // translate ctx 

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(this.camera_x, 0);
        // static elements on the canvas e.g. UI Elements
        this.addToMap(this.healthbar); 

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
        movObj.flipImage(this.ctx);
        movObj.draw(this.ctx);
        movObj.drawCollisionBox(this.ctx);
        this.ctx.restore();
    }

}