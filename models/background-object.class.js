class BackgroundObject extends MovableObject {
    width = 288;
    height = 208;

    constructor({imagePath,x,y}) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}