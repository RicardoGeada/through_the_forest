class World {
    level = level1;
    character = new Character();
    healthbar = new HealthBar();
    coins = new UICoins;
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
        this.update();
        this.checkCollisions();
        this.checkDeadEnemies();
    }

    setWorld() {
        this.character.world = this;
        this.healthbar.world = this;
        this.throwableObjects.world = this;
    }

    update() {
        setInterval(() => {
            this.checkJumpOnEnemy();
            this.checkCoinsCollision();
        }, 1000 / 60);
    }

    checkJumpOnEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy) && this.character.speedY < 0) {
                this.character.jump();
                enemy.hitBy(this.character);
            }
        }
    }

    checkCoinsCollision() {
        for (let i = 0; i < this.level.collectables.length; i++) {
            const collectable = this.level.collectables[i];
            if (collectable instanceof Coin && this.character.isColliding(collectable)) {
                this.coins.amount++;
                collectable.playSound(collectable.SOUND_COLLECT, 1);
                this.level.collectables.splice(i,1);
            }
        }
    }

    checkCollisions() {
        // SOLID BLOCKS
        setInterval(() => {
            for (let i = 0; i < this.level.backgroundObjects.length; i++) {
                const backgroundObject = this.level.backgroundObjects[i];
                if(this.character.speedY < 0 && this.character.isColliding(backgroundObject) && backgroundObject instanceof BackgroundTile) {
                    this.character.y = backgroundObject.y - this.character.height;
                    this.character.speedY = 0;
                    this.character.jumping = false;
                }
            }
        }, 1000 / 60);
        // ENEMIES 
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hitBy(enemy);
                    console.log(this.character.hp);
                };
            });
        }, 1000);
        // THROWABLE OBJECTS
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

    checkDeadEnemies() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(enemy.isDead() && enemy instanceof RoboTotem) {
                    let index = this.level.enemies.indexOf(enemy);
                    this.level.enemies.splice(index,1);
                }
            })
        }, 1000 / 60);
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear canvas at the beginning

        this.ctx.translate(-this.camera_x, 0); // translate ctx 

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(this.camera_x, 0);
        // static elements on the canvas e.g. UI Elements
        this.addToMap(this.healthbar); 
        this.addToMap(this.coins);


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