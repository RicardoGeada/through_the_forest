class MovableObject extends DrawableObject {
  speedX = 1;
  speedY = 0;
  acceleration = 1;
  dead = false;
  hp;
  dmg;
  lastHit = 0;
  gravityInterval;

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  jump() {
    this.speedY = 5;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        // if (this.y >= 160) {this.y = 160} // 160 = GROUND TODO: VARIABLE
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 208 - 32 - 16;
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width + this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width + obj.offset.right &&
      this.y + this.height + this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height + obj.offset.bottom
    );
  }

  hitBy(obj) {
    this.hp -= obj.dmg;
    if (this.hp < 0) {
      this.hp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.hp == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.25;
  }
}
