class MovableObject extends DrawableObject {
  speedX = 1;
  speedY = 0;
  acceleration = 1;
  dead = false;
  hp;
  dmg;
  lastHit = 0;
  gravityInterval;
  framesCounter = 0;
  movementInterval;
  animationInterval;

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  jump() {
    this.speedY = 10;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  loopAnimation(images,fps) {
    setStoppableInterval(this.playAnimation(images),fps)
  }

  playthroughAnimationLoop(images,fps) {
    this.currentImage = 0;
    let interval = setInterval(() => {
      if (this.currentImage < images.length) {
        this.playAnimation(images);
      } else {
        clearInterval(interval);
      }
    },fps)
  }


  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
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

  isVisibleFor(obj) {
    return (
      this.x + this.width + this.offset.right >= obj.x + obj.visionBoxOffset.left &&
      this.x + this.offset.left <= obj.x + obj.width + obj.visionBoxOffset.right &&
      this.y + this.height + this.offset.bottom >= obj.y + obj.visionBoxOffset.top &&
      this.y + this.offset.top <= obj.y + obj.height + obj.visionBoxOffset.bottom
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
    return timePassed < 0.5;
  }

  matchesFrameRate(frames) {
    return  this.framesCounter % Math.floor(60 / frames) == 0;
   }
 
  playSound(sound, playbackRate) {
    sound.playbackRate = playbackRate;
    sound.play() ? null : sound.play();
  }
}
