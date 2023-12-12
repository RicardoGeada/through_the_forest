class DrawableObject {
  x;
  y;
  width;
  height;
  img;
  imageCache = {};
  currentImage = 0;
  flipH = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  visionBoxOffset = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  hitbox = {
    melee: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  }

  /**
   * load image as object 
   * @param {string} path - img src path './img/....png'
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * load all images inside an array
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * draw image on canvas
   * @param {CanvasRenderingContext2D} ctx 
   */
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.flipH ? -this.x : this.x,
      this.y,
      this.width,
      this.height
    );
  }


  /**
   * flip image horizontal
   * @param {CanvasRenderingContext2D} ctx 
   */
  flipImage(ctx) {
    ctx.translate(this.flipH ? this.img.width : 0, 0);
    ctx.scale(this.flipH ? -1 : 1, 1);
  }


  // flipHitbox() {
  //   const left = this.hitbox.melee.left;
  //   const right = this.hitbox.melee.right;
  //   this.hitbox.melee.left = - right;
  //   this.hitbox.melee.right = - left;
  // }

  flipBoxHorizontal(box) {
    const left = box.left;
    const right = box.right;
    box.left = - right;
    box.right = - left;
  }

  flipAllBoxesHorizontally() {
    this.flipBoxHorizontal(this.hitbox.melee);
    this.flipBoxHorizontal(this.offset);
    this.flipBoxHorizontal(this.visionBoxOffset);
  }

  /**
   * draw image frame 
   * color : blue
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawImageFrame(ctx) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        this.flipH ? -this.x : this.x,
        this.y,
        this.img.width,
        this.img.height
      );
  }


  /**
   * draw collision box
   * - for the physical collision
   * color: red 
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawCollisionBox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Endboss
    ) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.img.width - this.offset.left + this.offset.right,
        this.img.height - this.offset.top + this.offset.bottom,
      );
    };
  }

  /**
   * draw vision box
   * - for interaction area
   * color: green
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawVisionBox(ctx) {
    if (this instanceof Endboss) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "green";
      ctx.strokeRect(
        this.x + this.visionBoxOffset.left,
        this.y + this.visionBoxOffset.top,
        this.img.width - this.visionBoxOffset.left + this.visionBoxOffset.right,
        this.img.height - this.visionBoxOffset.top + this.visionBoxOffset.bottom,
      );
    }
  }


  /**
   * draw hitbox 
   * - for melee attacks
   * color: yellow
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawHitboxMelee(ctx) {
    if (this instanceof Character) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(
        this.x + this.hitbox.melee.left,
        this.y + this.hitbox.melee.top,
        this.img.width - this.hitbox.melee.left + this.hitbox.melee.right,
        this.img.height - this.hitbox.melee.top + this.hitbox.melee.bottom,
      );
    }
  }


}
