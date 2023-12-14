class ThrowableObject extends MovableObject {
  world;
  throwInterval;

  constructor({x,y,directionRightToLeft}) {
    super();
    this.dmg = 1;
    this.width = 16;
    this.height = 16;
    this.x = x;
    this.y = y;
    this.speedX = directionRightToLeft ? -15 : 15;
    this.speedY = 5;
    this.throw();
  }


  /**
   * throw the object
   */
  throw() {
    this.movementInterval = setStoppableInterval(() => {
      this.updateGravity();
      this.x += this.speedX;
    }, 1000 / 25);
  }
  
}
