class Character extends MovableObject {
  world;
  width = 32;
  height = 32;
  jumping = false;
  reload = false;
  attacking = false;
  energy = 3;
  hitbox = {
    melee: {
        top: 0,
        bottom: 0,
        left: 16,
        right: 0,
    },
  }


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
    this.loadImages(this.IMAGES_RUN);
    this.offset = {
      top: 3,
      bottom: 0,
      left: 9,
      right: -11,
    };
   
    this.x = 7 * 16;
    this.y = 208 - 32 - 16 - 1;
    this.speedX = 1;
    this.hp = 5;
    this.dmg = 1;
    this.animate();
    // this.applyGravity();
  }

  animate() {
    this.movementInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
    this.animationInterval = setInterval(() => this.animateCharacter(), 1000 / 60);
  }

  moveCharacter() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 10 * 16 - this.offset.left) {
      this.moveRight();
      if (this.flipH) this.flipHitbox();
      this.flipH = false;
      this.isWalkingOnGround();
    };
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      if (!this.flipH) this.flipHitbox();
      this.flipH = true;
      this.isWalkingOnGround();
    };
    if (this.world.keyboard.SPACE && this.speedY == 0 && !this.jumping) {
      this.jumping = true;
      this.jump();
      playSound({sound: this.SOUND_JUMP, playbackRate: 1, volume: 0.5});
    };
    if (this.world.keyboard.MELEE_ATTACK && !this.reload) {
      playSound({sound: this.SOUND_ATTACK, playbackRate: 2, volume: 1});
      this.attacking = true;
      this.reload = true;
      setTimeout(()=> {
          this.reload = false;
      }, 500)
    }
    if (this.world.keyboard.RANGED_ATTACK && !this.reload && this.energy > 0) {
      let missile = new ThrowableCharacter(this.x + 0.5 * this.width,this.y + 0.25 * this.height,this.flipH);
      this.world.throwableObjects.push(missile);
      this.energy--;
      this.reload = true;
      setTimeout(()=> {
          this.reload = false;
      }, 1000)
    }
    if(this.x > 7 * 16 && this.x < this.world.level.level_end_x) {
      this.world.camera_x = this.x - 7 * 16; // focus camera on character
    }
    
  }

  animateCharacter() {
    if (this.isDead() && !this.attacking) {
      this.playthroughAnimationLoop(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
      this.clearIntervals();
    } else if (this.isHurt() && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.attacking) {
      this.playthroughAnimationLoop(this.IMAGES_ATTACK,1000 / (this.IMAGES_ATTACK.length * 2));
      this.clearIntervals();
      setTimeout(() => {
        this.attacking = false;
        this.animate();
      }, 500);
    } else if (this.speedY != 0 && this.jumping && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.matchesFrameRate(2)){
      this.playAnimation(this.IMAGES_IDLE);
    }
    this.framesCounter++;
    // console.log('animation is playing')
  }


  flipHitbox() {
    const left = this.hitbox.melee.left;
    const right = this.hitbox.melee.right;
    this.hitbox.melee.left = - right;
    this.hitbox.melee.right = - left;
  }

  isWalkingOnGround() {
    this.world.level.backgroundObjects.forEach((obj) => {
      if (this.isVisibleFor(obj) && (obj instanceof GroundBigBlock || obj instanceof GroundMediumBlock || obj instanceof GroundSmallBlock)) {
        playSound({sound: this.SOUND_WALK, playbackRate: 2});
      }
    })
  }

}
