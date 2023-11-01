class DrawableObject {
  x;
  y;
  img;
  width;
  height;
  imageCache = {};
  currentImage = 0;
  flipH = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.flipH ? -this.x : this.x,
      this.y,
      this.width,
      this.height
    );
  }

  flipImage(ctx) {
    ctx.translate(this.flipH ? this.img.width : 0, 0);
    ctx.scale(this.flipH ? -1 : 1, 1);
  }

  drawCollisionBox(ctx) {
    if (
      this instanceof Character ||
      this instanceof RoboTotem ||
      this instanceof Endboss ||
      this instanceof HealthBar
    ) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        this.flipH ? -this.x : this.x,
        this.y,
        this.img.width,
        this.img.height
      );

      ctx.strokeStyle = "red";
      ctx.strokeRect(
        this.flipH ? -(this.x - this.offset.left) : this.x + this.offset.left,
        this.y + this.offset.top,
        this.img.width - this.offset.left - this.offset.right,
        this.img.height - this.offset.top - this.offset.bottom,
      );
    }
  }
}
