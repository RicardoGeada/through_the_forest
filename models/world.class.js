class World {
    level = level1;
    character = new Character();
    healthbar = new HealthBar();
    energybar = new EnergyBar();
    coins = new UICoins();
    throwableObjects = [];
    keyboard;
    canvas;
    ctx;
    framesCounter = 0;

    camera_x = 0;

    constructor(canvas,keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.update();
    }



    /**
     * set the world variable for different objects
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach( enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
        this.healthbar.world = this;
        this.energybar.world = this;
        this.throwableObjects.world = this;
    }



    /**
     * update the world in an interval
     */
    update() {
        setInterval(() => {
            this.checkForSolidBlocks();
            if(this.matchesFrameRate(1)) this.checkEnemiesCollision();
            this.checkIfThrowableCharacterHitsEnemies();
            this.checkIfThrowableSkeletonHitsCharacter();
            this.checkIfThrowableHitsTerrain();
            this.checkJumpOnEnemy();
            this.checkFirstContactWithBoss();
            this.checkRangedAttackFromBoss();
            this.checkCoinsCollision();
            this.checkFruitsCollision();
            this.setEnemyDirection();
            this.checkDeadEnemies();
            this.framesCounter++;
        }, 1000 / 60);
    }



    /**
     * check if the character is jumping / falling on the enemy
     * leads to a jump()
     */
    checkJumpOnEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy) && this.character.speedY < -1 && !enemy.isDead()) {
                this.character.jump();
                enemy.hitBy(this.character);
            };
        };
    }



    /**
     * check for the first contact with the endboss
     *
     */
    checkFirstContactWithBoss() {
        this.level.enemies.forEach( enemy => {
                if (enemy instanceof Endboss && this.character.isVisibleFor(enemy)) {
                    enemy.firstContact = true;
                };
        });
    }



    /**
     * check if the character is in range for a ranged attack of the endboss
     */
    checkRangedAttackFromBoss() {
        this.level.enemies.forEach( enemy => {
            if (enemy instanceof Endboss && this.character.isVisibleFor(enemy) && enemy.awake && !enemy.attacking && !enemy.reload) {
                enemy.attacking = true;
            };
        })
    }



    /**
     * check if the character is colliding a coin
     */
    checkCoinsCollision() {
        for (let i = 0; i < this.level.collectables.length; i++) {
            const collectable = this.level.collectables[i];
            if (collectable instanceof Coin && this.character.isColliding(collectable)) {
                this.coins.amount++;
                collectable.playSound(collectable.SOUND_COLLECT, 1);
                this.level.collectables.splice(i,1);
            };
        };
    }



    /**
     * check if the character is colliding a fruit
     */
    checkFruitsCollision() {
        for (let i = 0; i < this.level.collectables.length; i++) {
            const collectable = this.level.collectables[i];
            if (collectable instanceof Fruit && this.character.isColliding(collectable)) {
                if (this.character.energy < this.energybar.maxEnergy) {
                    this.character.energy++;
                };
                collectable.playSound(collectable.SOUND_COLLECT, 1);
                this.level.collectables.splice(i,1);
            }
        }
    }



    /**
     * set the enemy direction to follow the character
     */
    setEnemyDirection() {
        this.level.enemies.forEach( enemy => {
            if (enemy instanceof Endboss && enemy.isHurt()) {
                enemy.moveDirection = '';
            } else if (enemy instanceof Endboss && enemy.x > this.character.x) {
                enemy.moveDirection = 'left';
            } else if (enemy instanceof Endboss && enemy.x < this.character.x) {
                enemy.moveDirection = 'right';
            };
        })
    }



    /**
     * check for solid blocks
     */
    checkForSolidBlocks() {
        this.checkHorizontalCollision();
        this.character.updateGravity();
        this.checkVerticalCollision();
    }



    /**
     * check horizontal collision for character
     */
    checkHorizontalCollision() {
        for (let i = 0; i < this.level.backgroundObjects.length; i++) {
            const backgroundObject = this.level.backgroundObjects[i];
            if(backgroundObject instanceof BackgroundTile && this.character.isColliding(backgroundObject)) {
                if(this.character.speedX > 0) {
                    this.character.x = backgroundObject.x - this.character.width - this.character.offset.right - 0.01;
                    break;
                };
                if(this.character.speedX < 0) {
                    this.character.x = backgroundObject.x + backgroundObject.width - this.character.offset.left + 0.01;
                    break;
                };
            };  
        };
    }

    

    /**
     * check vertical collison for character
     */
    checkVerticalCollision() {
        for (let i = 0; i < this.level.backgroundObjects.length; i++) {
            const backgroundObject = this.level.backgroundObjects[i];
            if(backgroundObject instanceof BackgroundTile && this.character.isColliding(backgroundObject)) {
                if(this.character.speedY < 0) {
                    this.character.speedY = 0;
                    this.character.y = backgroundObject.y - this.character.height - 0.01;
                    this.character.jumping = false;
                    break;
                };
                if(this.character.speedY > 0) {
                    this.character.speedY = 0;
                    this.character.y = backgroundObject.y + backgroundObject.height + 0.01;
                    if (this.character.y > 160) this.character.y = 159;
                    break;
                };
            };
        }; 
    }



    /**
     * check if character is colliding with enemies
     */
    checkEnemiesCollision() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hitBy(enemy);
                console.log(this.character.hp);
            };
        });
    }



    /**
     * check if Throwable from character hits an enemy
     */
    checkIfThrowableCharacterHitsEnemies() {
        this.throwableObjects.forEach( obj => {
            if (obj instanceof ThrowableCharacter) {
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
                })
            };
        });
    }



    /**
     * check if throwable from skeleton hits character
     */
    checkIfThrowableSkeletonHitsCharacter() {
        this.throwableObjects.forEach( obj => {
            if (obj instanceof ThrowableSkeleton) {        
                if (obj.isColliding(this.character) && !obj.dead) {
                    let index = this.throwableObjects.indexOf(obj); // Get the index of 'obj'
                    this.character.hitBy(obj);
                    console.log('character hp:',this.character.hp);
                    obj.dead = true;
                    clearInterval(obj.throwInterval);
                    clearInterval(obj.gravityInterval);
                    setTimeout(() => {
                        this.throwableObjects.splice(index,1);
                    }, 250);
                }
            
            };
        })
    }



    /**
     * check if throwable hits terrain
     */
    checkIfThrowableHitsTerrain() {
        this.throwableObjects.forEach( obj => {
            if (obj instanceof ThrowableCharacter || obj instanceof ThrowableSkeleton) {
                this.level.backgroundObjects.forEach((terrain) => {
                    if(terrain instanceof BackgroundTile && obj.isColliding(terrain) && !obj.dead) {
                        let index = this.throwableObjects.indexOf(obj); // Get the index of 'obj'
                        obj.dead = true;
                        clearInterval(obj.throwInterval);
                        clearInterval(obj.gravityInterval);
                        if (obj instanceof ThrowableCharacter) {
                            obj.explode();
                        };
                        setTimeout(() => {
                            this.throwableObjects.splice(index,1);
                        }, 250);
                    }
                })
            }; 
        })
    }



    /**
     * check if enemies are dead
     */
    checkDeadEnemies() {
            this.level.enemies.forEach((enemy) => {
                if(enemy.isDead() && enemy instanceof RoboTotem) {
                    let index = this.level.enemies.indexOf(enemy);
                    this.level.enemies.splice(index,1);
                }
            });
    }

    
    
    matchesFrameRate(frames) {
        return  this.framesCounter % Math.floor(60 / frames) == 0;
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
        this.addToMap(this.energybar); 
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
        movObj.drawVisionBox(this.ctx);
        this.ctx.restore();
    }

}