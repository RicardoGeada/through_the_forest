class MovableObject {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};
    currentImage = 0;
    speedX = 1;
    speedY = 0;
    acceleration = 1;
    flipH = false;

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
        ctx.drawImage(this.img, this.flipH ? -this.x : this.x, this.y, this.width, this.height);
    }

    drawCollisionBox(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.flipH ? -this.x : this.x,this.y,this.img.width,this.img.height);
    }

    flipImage(ctx) {
        ctx.translate(this.flipH ? this.img.width : 0, 0);
        ctx.scale(this.flipH ? -1 : 1, 1);
    }


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
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y >= 160) {this.y = 160} // 160 = GROUND TODO: VARIABLE
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 208 - 32 - 16;
    }
}