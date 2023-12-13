class MovableObject extends DrawableObject {
  speedX = 1;
  speedY = 0;
  acceleration = 0.25;
  dead = false;
  hp;
  dmg = 0;
  lastHit = 0;
  framesCounter = 0;
  movementInterval;
  animationInterval;
  singleAnimationInterval;
  
  /**
   * move right
   */
  moveRight() {
    this.speedX = Math.abs(this.speedX);
    this.x += this.speedX;
  }


  /**
   * move left
   */
  moveLeft() {
    this.speedX = -Math.abs(this.speedX);
    this.x += this.speedX;
  }


  /**
   * jump
   */
  jump() {
    this.speedY = 5;
  }


  /**
   * play through loaded images
   * @param {Array} images - array of image paths e.g. './img/walking_0.png'
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * play through one animation cycle
   * @param {Array} images - array of image paths e.g. './img/walking_0.png' 
   * @param {number} fps - fps / time for the interval
   */
  playthroughAnimationCycle(images,fps) {
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


  /**
   * update gravity
   */
  updateGravity() {
    this.y -= this.speedY;
    if (this.isAboveGround()) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY = 0;
    };
  }


  /**
   * is this above the ground ?
   * @returns boolean
   */
  isAboveGround() {
      return this.y + this.height - this.speedY < 208;
  }



  /**
   * is this colliding with the object ?
   * @param {object} obj - object to check collision with
   * @returns boolean
   */
  isColliding(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.collision.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.collision.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.collision.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.collision.bottom
    );
  }


  /**
   * is this in the vision hitbox of the object ? 
   * @param {object} obj - object with vision hitbox
   * @returns boolean
   */
  isVisibleFor(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.vision.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.vision.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.vision.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.vision.bottom
    );
  }


  /**
   * is this in the melee hitbox of the object ?
   * @param {object} obj - object with melee hitbox
   * @returns boolean
   */
  isInMeleeRange(obj) {
    return (
      this.x + this.width + this.hitbox.collision.right >= obj.x + obj.hitbox.melee.left &&
      this.x + this.hitbox.collision.left <= obj.x + obj.width + obj.hitbox.melee.right &&
      this.y + this.height + this.hitbox.collision.bottom >= obj.y + obj.hitbox.melee.top &&
      this.y + this.hitbox.collision.top <= obj.y + obj.height + obj.hitbox.melee.bottom
    );
  }


  /**
   * this getting hit by object
   * @param {object} obj - object that hits this
   */
  hitBy(obj) {
    this.hp -= obj.dmg;
    if (this.hp < 0) {
      this.hp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * is this dead ?
   * @returns boolean
   */
  isDead() {
    return this.hp == 0;
  }


  /**
   * check if enough time has past since the last hit
   * @returns boolean
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }


  /**
   * buffer to set different frame rates in one interval
   * @param {number} frames 
   * @returns boolean
   */
  matchesFrameRate(frames) {
    return  this.framesCounter % Math.floor(60 / frames) == 0;
   }
 

  /**
   * clear movement and animation intervals
   */
  clearIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }
}
