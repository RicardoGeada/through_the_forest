class Endboss extends MovableObject {
  world;
  width = 32;
  height = 32;
  y = 208 - this.height - 16;
  firstContact = false; // character sees the boss
  awake =  false; // has the character awaken the boss?
  moveDirection = '';
  attacking = false;
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
    this.offset = {
      top: 3,
      bottom: 0,
      left: 11,
      right: -7,
    };
    this.visionBoxOffset = {
      top: -100,
      bottom: 0,
      left: -100,
      right: 100,
    }
    this.x = 288 * 4 - this.width - 32;
    this.hp = 4;
    this.dmg = 2;
    this.speedX = 0.5;
    this.animate();
  }

  animate() {
    this.movementInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
    this.animationInterval = setInterval(() => this.animateCharacter(), 1000 / 60);
  }

  moveCharacter() {
    if (this.awake && !this.isDead()) {
      if (this.attacking && !this.reload) {
        this.reload = true;
        setTimeout(()=> {
          let missile = new ThrowableSkeleton(this.x,this.y,this.flipH);
          this.world.throwableObjects.push(missile);
        }, 800);
        setTimeout(() => {
          this.reload = false;
        }, 2500);
      }; 
      if (this.moveDirection == 'left' && this.matchesFrameRate(6)) {
        this.flipH = true;
        this.moveLeft();
        console.log('Moving Left');
      }; 
      if (this.moveDirection == 'right' && this.matchesFrameRate(6)) {
        this.flipH = false;
        this.moveRight();
      };
    }
  }

  animateCharacter() {
    if (this.awake) {
      if (this.isDead()) {
        this.playthroughAnimationLoop(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
      } else if (this.isHurt() && this.matchesFrameRate(12)) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.attacking) { 
        console.log('Animation Stop');
        this.playthroughAnimationLoop(this.IMAGES_BONE_TOSS, 1000 / this.IMAGES_BONE_TOSS.length);
        this.attacking = false;
        setTimeout(() => {
          this.animate();
          console.log('Animation Restart');
        }, 1000);
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
      } else if (this.matchesFrameRate(6)) { 
        this.playAnimation(this.IMAGES_WALKING);
      };
  } else if (this.firstContact) {
      clearInterval(this.animationInterval);
      this.playthroughAnimationLoop(this.IMAGES_WAKE_UP, 1000 / this.IMAGES_WAKE_UP.length);
      setTimeout(() => {
        this.animate();
        this.awake = true;
      }, 1000);
  } else {
    this.playAnimation(this.IMAGES_BONE_PILE);
  }
  this.framesCounter++;
  }


}

