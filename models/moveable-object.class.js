class MovableObject extends DrawableObject {
  speedX = 1;
  speedY = 0;
  acceleration = 0.25;
  dead = false;
  hp;
  dmg = 0;
  lastHit = 0;
  gravityInterval;
  framesCounter = 0;
  movementInterval;
  animationInterval;
  singleAnimationInterval;
  

  moveRight() {
    this.speedX = Math.abs(this.speedX);
    this.x += this.speedX;
  }

  moveLeft() {
    this.speedX = -Math.abs(this.speedX);
    this.x += this.speedX;
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

  loopAnimation(images,fps) {
    setStoppableInterval(this.playAnimation(images),fps)
  }

  playthroughAnimationLoop(images,fps) {
    this.currentImage = 0;
    clearInterval(this.singleAnimationInterval);
    this.singleAnimationInterval = setInterval(() => {
      if (this.currentImage < images.length) {
        this.playAnimation(images);
      } else {
        clearInterval(this.singleAnimationInterval);
      }
    },fps)
  }


  applyGravity() {
    this.gravityInterval = setInterval(() => {
      this.y -= this.speedY;
      if (this.isAboveGround()) {
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  updateGravity() {
    this.y -= this.speedY;
    if (this.isAboveGround()) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY = 0;
    };
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y + this.height - this.speedY < 208;
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.collision.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.collision.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.collision.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.collision.bottom
    );
  }

  isVisibleFor(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.vision.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.vision.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.vision.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.vision.bottom
    );
  }

  isInMeleeRange(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.melee.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.melee.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.melee.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.melee.bottom
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
 
  
  playSound({sound,playbackRate,volume,muted}) {
    sound.volume = volume ? volume : 1;
    sound.muted = muted ? muted : audio.muted;
    sound.playbackRate = playbackRate;
    sound.play() ? null : sound.play();
  }

  clearIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }
}
