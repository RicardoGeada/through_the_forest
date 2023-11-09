class Endboss extends MovableObject {
  width = 32;
  height = 32;
  y = 208 - this.height - 16;

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
    this.loadImage(this.IMAGES_WALKING[0]);

    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.offset = {
      top: 3,
      bottom: 0,
      left: 11,
      right: -7,
    };
    this.x = 288 * 4 - this.width - 32;
    this.hp = 4;
    this.dmg = 2;
    this.animate();
  }

  animate() {
    let animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.playthroughAnimationLoop(this.IMAGES_DYING,1000 / this.IMAGES_DYING.length);
        clearInterval(animationInterval);
      } else if (this.isHurt() && this.matchesFrameRate(12)) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.matchesFrameRate(12)) { 
        this.playAnimation(this.IMAGES_STANDING_IDLE);
      };
      this.framesCounter++;
    }, 1000 / 60);
  }
}
