class MovableObject {
    x;
    y;
    img;
    width;
    height;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += 1;
    }

    moveLeft() {
        this.x += -1;
    }
}