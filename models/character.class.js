class Character extends MovableObject {
  world;
  width = 32;
  height = 32;
  jumping = false;
  reload = false;
  isAttacking = false;
  isRangedAttack = false;
  energy = 3;

  IMAGES_WALKING = [
    "img/1.hero/Walk/walk_1.png",
    "img/1.hero/Walk/walk_2.png",
    "img/1.hero/Walk/walk_3.png",
    "img/1.hero/Walk/walk_4.png",
  ];

  IMAGES_JUMPING = [
    "img/1.hero/Jump/jump_1.png",
    "img/1.hero/Jump/jump_2.png",
    "img/1.hero/Jump/jump_3.png",
    "img/1.hero/Jump/jump_4.png",
    "img/1.hero/Jump/jump_5.png",
    "img/1.hero/Jump/jump_6.png",
    "img/1.hero/Jump/jump_7.png",
    "img/1.hero/Jump/jump_8.png",
  ];

  IMAGES_DYING = [
    "img/1.hero/Die/death_1.png",
    "img/1.hero/Die/death_2.png",
    "img/1.hero/Die/death_3.png",
    "img/1.hero/Die/death_4.png",
    "img/1.hero/Die/death_5.png",
    "img/1.hero/Die/death_6.png",
    "img/1.hero/Die/death_7.png",
    "img/1.hero/Die/death_8.png",
  ];

  IMAGES_HURT = [
    "img/1.hero/Die/death_1.png",
    "img/1.hero/Die/death_2.png",
    "img/1.hero/Die/death_3.png",
  ];

  IMAGES_ATTACK = [
    'img/1.hero/Attack/attack_1.png',
    'img/1.hero/Attack/attack_2.png',
    'img/1.hero/Attack/attack_3.png',
    'img/1.hero/Attack/attack_4.png',
    'img/1.hero/Attack/attack_5.png',
    'img/1.hero/Attack/attack_6.png',
    'img/1.hero/Attack/attack_7.png',
    'img/1.hero/Attack/attack_8.png',
  ];

  IMAGES_ATTACK_RANGED = [
    'img/1.hero/Ranged_Attack/ranged_attack_0.png',
    'img/1.hero/Ranged_Attack/ranged_attack_1.png',
    'img/1.hero/Ranged_Attack/ranged_attack_2.png',
    'img/1.hero/Ranged_Attack/ranged_attack_3.png',
    'img/1.hero/Ranged_Attack/ranged_attack_4.png',
    'img/1.hero/Ranged_Attack/ranged_attack_5.png',
    'img/1.hero/Ranged_Attack/ranged_attack_6.png',
    'img/1.hero/Ranged_Attack/ranged_attack_7.png',
  ]

  IMAGES_RUN =  [
    'img/1.hero/Run/run_1.png',
    'img/1.hero/Run/run_2.png',
    'img/1.hero/Run/run_3.png',
    'img/1.hero/Run/run_4.png',
    'img/1.hero/Run/run_5.png',
    'img/1.hero/Run/run_6.png',
    'img/1.hero/Run/run_7.png',
    'img/1.hero/Run/run_8.png',
  ];

  IMAGES_IDLE = [ 
    'img/1.hero/Idle/idle_1.png', 
    'img/1.hero/Idle/idle_2.png'
  ];

  SOUND_ATTACK = new Audio('./audio/1.hero/hero_attack.wav');
  SOUND_WALK = new Audio('./audio/1.hero/hero_walk.wav');
  SOUND_JUMP = new Audio('./audio/1.hero/hero_jump.wav');
  SOUND_HURT = new Audio('./audio/1.hero/hero_hurt.mp3');

  constructor() {
    super().loadImage("img/1.hero/Idle/idle_1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ATTACK_RANGED);
    this.loadImages(this.IMAGES_RUN);
    this.hitbox.collision = {
      top: 3,
      bottom: 0,
      left: 10,
      right: -10,
    };
    this.hitbox.melee = {
      top: 0,
      bottom: 0,
      left: 16,
      right: 0,
    }
    this.x = 7 * 16;
    this.y = 208 - 32 - 16 - 1;
    this.speedX = 1;
    this.hp = 5;
    this.dmg = 1;
    this.animate();
  }

  /**
   * animate
   */
  animate() {
    this.movementInterval = setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    this.animationInterval = setStoppableInterval(() => this.animateCharacter(), 1000 / 60);
  }


  /**
   * physical animation
   */
  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.jump();
    if (this.canMeleeAttack()) this.meleeAttack();
    if (this.canRangedAttack()) this.rangedAttack();
    if (this.inFocusArea()) this.setFocusOnCharacter();  
  }

  //#region moveCharacter

    /**
     * condition to move right
     * @returns boolean
     */
    canMoveRight() {
      return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 10 * 16 - this.hitbox.collision.left;
    }


    /**
     * move right
     */
    moveRight() {
      super.moveRight();
      if (this.flipH) this.flipAllBoxesHorizontally();
      this.flipH = false;
      this.isWalkingOnGround();
    }


    /**
     * condition to move left
     * @returns boolean
     */
    canMoveLeft() {
      return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * move left
     */
    moveLeft() {
      super.moveLeft();
      if (!this.flipH) this.flipAllBoxesHorizontally();
        this.flipH = true;
        this.isWalkingOnGround();
    }


    /**
     * check if the player is walking on ground
     * - play ground walking sound
     */
    isWalkingOnGround() {
      this.world.level.backgroundObjects.forEach((obj) => {
        if (this.isVisibleFor(obj) && (obj instanceof GroundBigBlock || obj instanceof GroundMediumBlock || obj instanceof GroundSmallBlock)) {
          playSound({sound: this.SOUND_WALK, playbackRate: 2});
        }
      })
    }


    /**
     * condition to jump
     * @returns boolean
     */
    canJump() {
      return this.world.keyboard.SPACE && this.speedY == 0 && !this.jumping;
    }


    /**
     * jump
     */
    jump() {
      this.jumping = true;
      super.jump();
      playSound({sound: this.SOUND_JUMP, playbackRate: 1, volume: 0.5});
    }


    /**
     * condition to attack melee
     * @returns boolean
     */
    canMeleeAttack() {
      return this.world.keyboard.MELEE_ATTACK && !this.reload;
    }


    /**
     * melee attack
     */
    meleeAttack() {
      playSound({sound: this.SOUND_ATTACK, playbackRate: 2, volume: 1});
      this.isAttacking = true;
      this.reload = true;
      setTimeout(()=>  this.reload = false, 500);
    }


    /**
     * condition to range attack
     * @returns boolean
     */
    canRangedAttack() {
      return this.world.keyboard.RANGED_ATTACK && !this.reload && this.energy > 0;
    }


    /**
     * ranged attack
     */
    rangedAttack() { 
      this.isRangedAttack = true;
      this.energy--;
      this.reload = true;
      setTimeout(() => {
        let missile = new ThrowableCharacter({x: this.x + (this.flipH ? -13 : 13), y: this.y + (this.flipH ? 4 : -4), directionRightToLeft: this.flipH});
        this.world.throwableObjects.push(missile);
      }, 375);
      setTimeout(()=> {
          this.reload = false;
          
      }, 1000)
    }


    /**
     * condition to check if the camera needs to follow the character
     * @returns boolean
     */
    inFocusArea() {
      return this.x > 7 * 16 && this.x < this.world.level.level_end_x;
    }


    /**
     * set the camera focus on the character
     */
    setFocusOnCharacter() {
      this.world.camera_x = this.x - 7 * 16; // focus camera on character
    }

  //#endregion

  animateCharacter() {
    if (this.isDead() && !this.isAttacking) {
      this.animateDeath();
    } else if (this.isHurt() && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAttacking) {
      this.animateMeleeAttack();
    } else if (this.isRangedAttack) {
      this.animateRangedAttack();
    } else if (this.jumping && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.isWalking()  && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.matchesFrameRate(2)){
      this.playAnimation(this.IMAGES_IDLE);
    }
    this.framesCounter++;
  }

  //#region  animateCharacter

    /**
     * play death animation
     */
    animateDeath() {
      this.playthroughAnimationCycle(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
      this.clearIntervals();
    }


    /**
     * play melee attack animation
     */
    animateMeleeAttack() {
      this.playthroughAnimationCycle(this.IMAGES_ATTACK,1000 / (this.IMAGES_ATTACK.length * 2));
      clearInterval(this.animationInterval);
      setTimeout(() => {
        this.isAttacking = false;
        this.clearIntervals();
        this.animate();
      }, 500);
    }


    /**
     * play melee attack animation
     */
    animateRangedAttack() {
      this.playthroughAnimationCycle(this.IMAGES_ATTACK_RANGED,1000 / (this.IMAGES_ATTACK_RANGED.length * 2));
      clearInterval(this.animationInterval);
      setTimeout(() => {
        this.isRangedAttack = false;
        this.clearIntervals();
        this.animate();
      }, 500);
    }


    /**
     * condition to check if the character is walking
     * @returns boolean
     */
    isWalking() {
      return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT);
    }

  //#endregion




  

}
