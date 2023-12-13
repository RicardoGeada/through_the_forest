class ThrowableObject extends MovableObject {
  world;
  throwInterval;

  constructor(x,y,directionRightToLeft) {
    super();
    this.dmg = 1;
    this.width = 16;
    this.height = 16;
    this.throw(x,y,directionRightToLeft);
  }

  throw(x,y,directionRightToLeft) {
    this.x = x;
    this.y = y;
    this.speedX = directionRightToLeft ? -15 : 15;
    this.speedY = 5;
    this.movementInterval = setStoppableInterval(() => {
      this.updateGravity();
      this.x += this.speedX;
    }, 1000 / 25);
  }
  
}
