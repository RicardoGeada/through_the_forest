class World {
  level = level1;
  character = new Character();
  healthbars = {
    character: [
      new HealthBar({ unit: this.character, x: 10, y: 10, world: this }),
    ],
    enemies: [],
  };
  energybar = new EnergyBar();
  coins = new UICoins();
  throwableObjects = [];
  keyboard;
  canvas;
  ctx;
  framesCounter = 0;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    let self = this;
    setStoppableInterval(() => this.update(self), 1000 / 60);
  }

  /**
   * set the world variable for different objects
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
    this.energybar.world = this;
    this.throwableObjects.world = this;
  }

  /**
   * update the world in an interval
   */
  update(self) {
    self.applyPhysics(self.character);
    self.applyPhysicsEnemies();
    self.applyPhysicsCoins();

    self.checkDamageFromBuildingBlock();
    if (self.matchesFrameRate(1)) self.checkCharacterEnemyCollision();

    self.checkIfThrowableCharacterHitsEnemies();
    self.checkIfThrowableSkeletonHitsCharacter();
    self.checkIfThrowableHitsBuildingblock();

    self.checkCharacterJumpOnEnemy();
    self.checkCharacterMeleeAttack();

    self.checkFirstContactWithBoss();
    self.checkRangedAttackFromBoss();

    self.checkCoinsCollision();
    self.checkFruitsCollision();

    self.letEnemyFollowCharacter();

    self.checkDeadEnemies();
    self.checkDeadBuildingBlock();
    self.checkDeadThrowable();

    self.checkEnemyHealthbars();

    self.checkGameState();
    self.framesCounter++;
  }


  /**
   * apply physics
   * - horizontal and vertical collision with solid blocks
   * - gravity
   * @param {object} unit - object to apply physics
   */
  applyPhysics(unit) {
    this.checkHorizontalCollision(unit);
    unit.updateGravity();
    this.checkVerticalCollision(unit);
  }


  /**
   * apply physics to all enemies
   */
  applyPhysicsEnemies() {
    this.level.enemies.forEach((enemy) => {
      this.applyPhysics(enemy);
    });
  }


  /**
   * apply physics to coins
   */
  applyPhysicsCoins() {
    this.level.collectables.forEach((collectable) => {
      if (collectable instanceof Coin) this.applyPhysics(collectable);
    })
  }

  /**
   * check horizontal collision for character
   */
  checkHorizontalCollision(char) {
    for (let i = 0; i < this.level.backgroundObjects.length; i++) {
      const backgroundObject = this.level.backgroundObjects[i];
      if (backgroundObject instanceof BuildingBlock && backgroundObject.solid && char.isColliding(backgroundObject)) {
        if (char.speedX > 0 && char.x < backgroundObject.x) {
          char.x = backgroundObject.x - char.width - char.hitbox.collision.right - 0.01;
          this.changeEnemyDirection(char);
          break;
        }
        if (char.speedX < 0 && char.x > backgroundObject.x) {
          char.x = backgroundObject.x + backgroundObject.width - char.hitbox.collision.left + 0.01;
          this.changeEnemyDirection(char);
          break;
        }
      }
    }
  }


  /**
   * check vertical collison for character
   */
  checkVerticalCollision(char) {
    for (let i = 0; i < this.level.backgroundObjects.length; i++) {
      const backgroundObject = this.level.backgroundObjects[i];
      if (backgroundObject instanceof BuildingBlock && backgroundObject.solid && char.isColliding(backgroundObject)) {
        if (char.speedY < -Math.abs(char.acceleration) && char.y < backgroundObject.y) {
          char.speedY = 0;
          char.y = backgroundObject.y + backgroundObject.hitbox.collision.top - char.height - 0.01;
          char.jumping = false;
          break;
        }
        if (char.speedY > -Math.abs(char.acceleration) && char.y + char.height > backgroundObject.y + backgroundObject.height) {
          char.speedY = 0;
          char.y = backgroundObject.y + backgroundObject.height + backgroundObject.hitbox.collision.bottom + 0.01;
          if (char.y > 160) char.y = 159;
          break;
        }
      }
    }
  }


  /**
   * check if character takes damage from building block
   */
  checkDamageFromBuildingBlock() {
    this.level.backgroundObjects.forEach((backgroundObject) => {
      if (
        backgroundObject instanceof BuildingBlock &&
        backgroundObject.isAttacking &&
        this.character.isInMeleeRange(backgroundObject) &&
        !this.character.isDead() &&
        backgroundObject.dmg > 0
      ) {
        this.character.hitBy(backgroundObject);
        playSound({ sound: this.character.SOUND_HURT, playbackRate: 1 });
      }
    });
  }


  /**
   * check if character hits enemies or building blocks with melee attack
   */
  checkCharacterMeleeAttack() {
    this.checkCharacterMeleeAttackOnEnemies();
    this.checkCharacterMeleeAttackOnBuildingBlocks(); 
  }


  /**
   * check character melee attacks on enemies
   */
  checkCharacterMeleeAttackOnEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isAttacking &&
        enemy.isInMeleeRange(this.character) &&
        !enemy.isHurt() &&
        enemy.awake
      ) {
        this.character.isAttacking = false;
        setTimeout(() => enemy.hitBy(this.character), 250);
      }
    });
  }


  /**
   * check character melee attacks on building blocks
   */
  checkCharacterMeleeAttackOnBuildingBlocks() {
    this.level.backgroundObjects.forEach((backgroundObject) => {
      if (
        this.character.isAttacking &&
        backgroundObject.isInMeleeRange(this.character) &&
        backgroundObject instanceof BuildingBlock &&
        backgroundObject.hp > 0 &&
        !backgroundObject.dead &&
        !backgroundObject.isHurt()
      ) {
        this.character.isAttacking = false;
        setTimeout(() => backgroundObject.hitBy(this.character), 250);
      }
    });
  }


  /**
   * check if the character is jumping / falling on the enemy
   * leads to a jump()
   */
  checkCharacterJumpOnEnemy() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      const enemy = this.level.enemies[i];
      if (this.character.isColliding(enemy) && this.character.speedY < -1 && !enemy.isDead() && enemy.awake) {
        playSound({sound: this.character.SOUND_JUMP, playbackRate: 1, volume: 0.5});
        this.character.jump();
        enemy.hitBy(this.character);
      }
    }
  }


  /**
   * check for the first contact with the endboss
   */
  checkFirstContactWithBoss() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && this.character.isVisibleFor(enemy) && !enemy.firstContact) {
        enemy.firstContact = true;
        playMusic({ sound: music.boss, playbackRate: 1, volume: 0.5 });
      }
    });
  }


  /**
   * set the enemy direction to follow the character
   */
  letEnemyFollowCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && enemy.isHurt()) {
        enemy.moveDirection = "";
      } else if (enemy instanceof Endboss && enemy.x > this.character.x) {
        enemy.moveDirection = "left";
      } else if (enemy instanceof Endboss && enemy.x < this.character.x) {
        enemy.moveDirection = "right";
      }
    });
  }


  /**
   * change the moveDirection of an enemy
   * @param {object} enemy 
   */
  changeEnemyDirection(enemy) {
    if (enemy instanceof RoboTotem) {
      enemy.moveDirection = enemy.moveDirection == 'right' ? 'left' : 'right';
    }
  }


  /**
   * check if the character is in range for a ranged attack of the endboss
   */
  checkRangedAttackFromBoss() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && this.character.isVisibleFor(enemy) && enemy.awake && !enemy.isAttacking && !enemy.reload) {
        enemy.isAttacking = true;
      }
    });
  }


  /**
   * check if character is colliding with enemies
   */
  checkCharacterEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.jumping) {
        this.character.hitBy(enemy);
        playSound({ sound: this.character.SOUND_HURT, playbackRate: 1 });
      }
    });
  }


  /**
   * check if Throwable from character hits an enemy
   */
  checkIfThrowableCharacterHitsEnemies() {
    this.throwableObjects.forEach((obj) => {
      if (obj instanceof ThrowableCharacter) {
        this.level.enemies.forEach((enemy) => {
          if (obj.isColliding(enemy) && !obj.isDead() && enemy.awake) {
            enemy.hitBy(obj);
            obj.hp = 0;
            clearInterval(obj.movementInterval);
            obj.explode();
            setTimeout(() => obj.dead = true, 250);
          }
        });
      }
    });
  }


  /**
   * check if throwable from skeleton hits character
   */
  checkIfThrowableSkeletonHitsCharacter() {
    this.throwableObjects.forEach((obj) => {
      if (obj instanceof ThrowableSkeleton) {
        if (obj.isColliding(this.character) && !obj.isDead()) {
          this.character.hitBy(obj);
          obj.hp = 0;
          playSound({ sound: this.character.SOUND_HURT, playbackRate: 1 });
          clearInterval(obj.movementInterval);
          setTimeout(() => obj.dead = true, 250);
        }
      }
    });
  }


  /**
   * check if throwable hits buildingblock
   */
  checkIfThrowableHitsBuildingblock() {
    this.throwableObjects.forEach((obj) => {
      if (obj instanceof ThrowableCharacter || obj instanceof ThrowableSkeleton) {
        this.level.backgroundObjects.forEach((buildingblock) => {
          if (buildingblock instanceof BuildingBlock && buildingblock.solid && obj.isColliding(buildingblock) && !obj.isDead()) {
            buildingblock.hitBy(obj);
            obj.hp = 0;
            clearInterval(obj.movementInterval);
            if (obj instanceof ThrowableCharacter) obj.explode();
            setTimeout(() => obj.dead = true, 250);
          }
        });
      }
    });
  }


  /**
   * check if enemies are dead
   */
  checkDeadEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.dead && !(enemy instanceof Endboss)) {
        if (enemy instanceof RoboTotem) this.dropFruit(enemy);
        let index = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(index, 1);
      }
      if (enemy.isDead() && !enemy.dead && enemy instanceof Endboss) {
        enemy.dead = true;
        playMusic({ sound: music.background, playbackRate: 1, volume: 0.5 });
      }
    });
  }


  /**
   * check if building block is dead
   */
  checkDeadBuildingBlock() {
    this.level.backgroundObjects.forEach((buildingblock) => {
      if (buildingblock.isDead() && buildingblock instanceof StoneSmallBlock) {
        let index = this.level.backgroundObjects.indexOf(buildingblock);
        this.level.backgroundObjects.splice(index, 1);
      }
    });
  }


  /**
   * check if throwable is dead
   */
  checkDeadThrowable() {
    this.throwableObjects.forEach((obj) => {
      let index = this.throwableObjects.indexOf(obj);
      if (obj.dead) this.throwableObjects.splice(index,1);
    })
  }


  /**
   * check if healthbars need to be deleted
   */
  checkEnemyHealthbars() {
    this.healthbars.enemies.forEach((healthbar) => {
      if (healthbar.unit.isDead()) {
        let index = this.healthbars.enemies.indexOf(healthbar);
        this.healthbars.enemies.splice(index, 1);
      }
    });
  }


   /**
   * check if the character is colliding a coin
   */
   checkCoinsCollision() {
    for (let i = 0; i < this.level.collectables.length; i++) {
      const collectable = this.level.collectables[i];
      if (collectable instanceof Coin && this.character.isColliding(collectable)) {
        this.coins.amount++;
        playSound({ sound: collectable.SOUND_COLLECT, playbackRate: 1 });
        this.level.collectables.splice(i, 1);
      }
    }
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
        playSound({ sound: collectable.SOUND_COLLECT, playbackRate: 1 });
        this.level.collectables.splice(i, 1);
      }
    }
  }

  /**
   * let enemy drop fruit
   * @param {object} enemy 
   */
  dropFruit(enemy) {
    if (Math.random() <  0.7) {
      this.level.collectables.push(new Fruit({ x: enemy.x, y: enemy.y })); // DROP FRUITS
    }
  }

  /**
   * check for the game state
   */
  checkGameState() {
    this.checkGameover();
    this.checkVictory();
  }


  /**
   * check if the player is dead
   */
  checkGameover() {
    if (this.character.isDead()) {
      setTimeout(() => {
        playMusic({ sound: music.gameover, playbackRate: 1 });
        generateEndscreen(false);
        stopIntervals();
      }, 1000);
    }
  }


  /**
   * check if the player is victorious
   */
  checkVictory() {
    this.level.backgroundObjects.forEach((obj) => {
      if (obj instanceof HouseBlock && this.character.isColliding(obj) && !this.character.isDead()
      ) {
        obj.doorOpen = true;
        stopIntervals();
        playMusic({ sound: music.victory, playbackRate: 1, volume: 0.5 });
        setTimeout(() => {
          generateEndscreen(true);
        }, 1000);
      }
    });
  }


  /**
   * set other frame rates inside one interval of 60fps
   * @param {number} frames - goal framerate
   * @returns boolean
   */
  matchesFrameRate(frames) {
    return this.framesCounter % Math.floor(60 / frames) == 0;
  }


  /**
   * draw everything on the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas at the beginning

    this.ctx.translate(-this.camera_x, 0); // translate ctx

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectables);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.healthbars.enemies);

    this.ctx.translate(this.camera_x, 0);

    // static elements on the canvas e.g. UI Elements
    this.addObjectsToMap(this.healthbars.character);
    this.addToMap(this.energybar);
    this.addToMap(this.coins);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * add multiple objects to the map
   * @param {Array} objs - array of objects
   */
  addObjectsToMap(objs) {
    objs.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * add an object to the map
   * @param {object} movObj 
   */
  addToMap(movObj) {
    this.ctx.save();
    movObj.flipImage(this.ctx);
    movObj.draw(this.ctx);
    this.ctx.restore();
    // movObj.drawImageFrame(this.ctx);
    // movObj.drawCollisionBox(this.ctx);
    // movObj.drawVisionBox(this.ctx);
    // movObj.drawHitboxMelee(this.ctx);
  }
}
