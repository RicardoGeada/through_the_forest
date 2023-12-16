class Endboss extends MovableObject {
  world;
  width = 32;
  height = 32;
  y = 208 - this.height - 16;
  firstContact = false; 
  awake =  false; 
  moveDirection = '';
  isAttacking = false;
  reload = false;

  IMAGES_BONE_PILE = [
    'img/3.boss/Skeleton/Bone_Pile/bone_pile.png',
  ]

  IMAGES_BONE_TOSS = [
    'img/3.boss/Skeleton/Bonetoss/bone_toss_1.png',
    'img/3.boss/Skeleton/Bonetoss/bone_toss_2.png',
    'img/3.boss/Skeleton/Bonetoss/bone_toss_3.png',
    'img/3.boss/Skeleton/Bonetoss/bone_toss_4.png',
    'img/3.boss/Skeleton/Bonetoss/bone_toss_5.png',
  ]

  IMAGES_DYING = [
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_1.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_2.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_3.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_4.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_5.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_6.png',
    'img/3.boss/Skeleton/Crumbling_Into_Bone_Pile/crumbling_into_bone_pile_7.png',
  ];

  IMAGES_HURT = [
    'img/3.boss/Skeleton/Hurt/hurt_1.png',
    'img/3.boss/Skeleton/Hurt/hurt_2.png',
  ];

  IMAGES_STANDING_IDLE = [
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_1.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_2.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_3.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_4.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_5.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_6.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_7.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_8.png',
    'img/3.boss/Skeleton/Standing_Idle/standing_idle_9.png',
  ];

  IMAGES_WAKE_UP = [
    'img/3.boss/Skeleton/Wakeup/wake_up_1.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_2.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_3.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_4.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_5.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_6.png',
    'img/3.boss/Skeleton/Wakeup/wake_up_7.png',
  ]

  IMAGES_WALKING = [
    "img/3.boss/Skeleton/Walk/walk_1.png",
    "img/3.boss/Skeleton/Walk/walk_2.png",
    "img/3.boss/Skeleton/Walk/walk_3.png",
    "img/3.boss/Skeleton/Walk/walk_4.png",
    "img/3.boss/Skeleton/Walk/walk_5.png",
    "img/3.boss/Skeleton/Walk/walk_6.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WAKE_UP[0]);
    this.loadImages(this.IMAGES_BONE_PILE);
    this.loadImages(this.IMAGES_BONE_TOSS);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING_IDLE);
    this.loadImages(this.IMAGES_WAKE_UP);
    this.loadImages(this.IMAGES_WALKING);
    this.hitbox.collision = {
      top: 3,
      bottom: 0,
      left: 11,
      right: -7,
    };
    this.hitbox.vision = {
      top: -100,
      bottom: 0,
      left: -100,
      right: 100,
    }
    this.x = 90 * 16;
    this.hp = 5;
    this.dmg = 2;
    this.speedX = 1 / 12;
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
    if (this.awake && !this.isDead()) {
      if (this.isAttacking && !this.reload) {
        this.tossBone();
      }; 
      if (this.moveDirection == 'left') {
        this.moveLeft();
      }; 
      if (this.moveDirection == 'right') {
        this.moveRight();
      };
    };
  }

  //#region moveCharacter

    /**
     * throw a bone
     */
    tossBone() {
      this.reload = true;
      setTimeout(()=> {
        let missile = new ThrowableSkeleton({x: this.x, y: this.y, directionRightToLeft: this.flipH});
        this.world.throwableObjects.push(missile);
      }, 800);
      setTimeout(() => this.reload = false, 2500);
    }


    /**
     * move left
     */
    moveLeft() {
      if (!this.flipH) this.flipAllBoxesHorizontally();
      this.flipH = true;
      super.moveLeft();
    }


    /**
     * move right
     */
    moveRight() {
      if (this.flipH) this.flipAllBoxesHorizontally();
      this.flipH = false;
      super.moveRight();
    }

  //#endregion

  /**
   * visual animation
   */
  animateCharacter() {
    if (this.awake) {
        if (this.isDead()) 
          this.animateDeath();
        else if (this.isHurt()) 
          this.animateHurt();
        else if (this.isAttacking) 
          this.animateBoneToss();
        else if (this.matchesFrameRate(6)) 
          this.playAnimation(this.IMAGES_WALKING);
    } else if (this.firstContact) {
        this.animateAwakening();
    } else {
      this.playAnimation(this.IMAGES_BONE_PILE);
    };
  this.framesCounter++;
  }


  //#region  animateCharacter

  /**
   * animate death
   */
  animateDeath() {
    this.playthroughAnimationCycle(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
    this.clearIntervals();
  }


  /**
   * animate hurt
   */
  animateHurt() {
    this.playthroughAnimationCycle(this.IMAGES_HURT, 1000 / (this.IMAGES_HURT * 2));
    setTimeout(() => this.animate(), 500);
    this.clearIntervals();
  }


  /**
   * animate bone toss
   */
  animateBoneToss() {
    this.playthroughAnimationCycle(this.IMAGES_BONE_TOSS, 1000 / this.IMAGES_BONE_TOSS.length);
    this.isAttacking = false;
    setTimeout(() => this.animate(), 1000);
    this.clearIntervals();
  }


  /**
   * animate awakening
   */
  animateAwakening() {
    this.clearIntervals();
    this.playthroughAnimationCycle(this.IMAGES_WAKE_UP, 1000 / this.IMAGES_WAKE_UP.length);
    setTimeout(() => {
      this.animate();
      this.world.healthbars.enemies.push(new HealthBar({unit: this, x: this.x, y: this.y - this.height, world: this.world}));
      this.awake = true;
    }, 1000);
  }

  //#endregion

}

