class ThrowableObject extends MovableObject {
  world;
  throwInterval;

  IMAGES_EXPLODE = [
    "img/1.hero/Ranged_Attack_Missile/missile_1.png",
    "img/1.hero/Ranged_Attack_Missile/missile_2.png",
    "img/1.hero/Ranged_Attack_Missile/missile_3.png",
    "img/1.hero/Ranged_Attack_Missile/missile_4.png",
    "img/1.hero/Ranged_Attack_Missile/missile_5.png",
    "img/1.hero/Ranged_Attack_Missile/missile_6.png",
    "img/1.hero/Ranged_Attack_Missile/missile_7.png",
    "img/1.hero/Ranged_Attack_Missile/missile_8.png",
  ];

  constructor(x,y) {
    super().loadImage("img/1.hero/Ranged_Attack_Missile/missile_1.png");
    this.loadImages(this.IMAGES_EXPLODE);
    this.dmg = 1;
    this.width = 16;
    this.height = 16;
    this.throw(x,y);
  }

  throw(x,y) {
    this.x = x;
    this.y = y;
    this.speedX = 15;
    this.speedY = 5;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.x += this.speedX; 
    }, 1000 / 25);
  }

  explode() {
    let i = 0;
    this.currentImage = 0;
    setInterval(() => {
      if (i < this.IMAGES_EXPLODE.length) {
        this.playAnimation(this.IMAGES_EXPLODE);
      };
      i++;
    }, 1000 / 35)
    
  }
}
