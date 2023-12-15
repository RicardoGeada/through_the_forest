class DrawableObject {
  x;
  y;
  width;
  height;
  img;
  imageCache = {};
  currentImage = 0;
  flipH = false;

  hitbox = {
    collision: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    vision: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

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


  /**
   * flip the hitbox horizontally
   * @param {JSON} hitbox - offsets for different hitboxes
   */
  flipBoxHorizontal(hitbox) {
    const left = hitbox.left;
    const right = hitbox.right;
    hitbox.left = - right;
    hitbox.right = - left;
  }


  /**
   * flip all hitboxes horizontally 
   */
  flipAllBoxesHorizontally() {
    this.flipBoxHorizontal(this.hitbox.collision);
    this.flipBoxHorizontal(this.hitbox.vision);
    this.flipBoxHorizontal(this.hitbox.melee);
  }


  /**
   * draw image frame 
   * color : blue
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawImageFrame(ctx) {
    if (this instanceof WhispyFire) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        this.flipH ? -this.x : this.x,
        this.y,
        this.img.width,
        this.img.height
      );
    }
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
        this.x + this.hitbox.collision.left,
        this.y + this.hitbox.collision.top,
        this.img.width - this.hitbox.collision.left + this.hitbox.collision.right,
        this.img.height - this.hitbox.collision.top + this.hitbox.collision.bottom,
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
    if (this instanceof Endboss || this instanceof LavaBlock) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "green";
      ctx.strokeRect(
        this.x + this.hitbox.vision.left,
        this.y + this.hitbox.vision.top,
        this.img.width - this.hitbox.vision.left + this.hitbox.vision.right,
        this.img.height - this.hitbox.vision.top + this.hitbox.vision.bottom,
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
    if (this instanceof Character || this instanceof LavaBlock) {
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
