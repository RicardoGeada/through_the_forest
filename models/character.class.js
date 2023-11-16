class Character extends MovableObject {
  world;
  width = 32;
  height = 32;
  jumping = false;
  reload = false;
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
  ]

  IMAGES_IDLE = [ 
    'img/1.hero/Idle/idle_1.png', 
    'img/1.hero/Idle/idle_2.png'
                ];

  SOUND_WALK = new Audio('../audio/1.hero/hero_walk.wav');

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
      left: 5,
      right: -7,
    };
    this.x = 32;
    this.y = 208 - 32 - 16;
    this.speedX = 1;
    this.hp = 5;
    this.dmg = 1;
    this.animate();
    this.applyGravity();
  }

  animate() {
    this.movementInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
    this.animationInterval = setInterval(() => this.animateCharacter(), 1000 / 60);
  }

  moveCharacter() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 300) {
      this.moveRight();
      this.flipH = false;
      !this.isAboveGround() ? this.playSound(this.SOUND_WALK, 2) : null;
    }
    if (this.world.keyboard.LEFT && this.x > 32) {
      this.moveLeft();
      this.flipH = true;
      !this.isAboveGround() ? this.playSound(this.SOUND_WALK, 2) : null;
    }
    if (this.world.keyboard.SPACE && this.speedY == 0 && !this.jumping) {
      this.jumping = true;
      this.jump();
    }
    if (this.world.keyboard.RANGED_ATTACK && !this.reload && this.energy > 0) {
      let missile = new ThrowableCharacter(this.x,this.y,this.flipH);
      this.world.throwableObjects.push(missile);
      this.energy--;
      this.reload = true;
      setTimeout(()=> {
          this.reload = false;
      }, 1000)
    }
    this.world.camera_x = this.x - 32; // focus camera on character
  }

  animateCharacter() {
    if (this.isDead()) {
      this.playthroughAnimationLoop(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
      clearInterval(this.animationInterval);
      clearInterval(this.movementInterval);
    } else if (this.isHurt() && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.speedY != 0 && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.matchesFrameRate(12)) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.matchesFrameRate(2)){
      this.playAnimation(this.IMAGES_IDLE);
    }
    this.framesCounter++;
  }

}
