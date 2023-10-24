class BackgroundTile extends BackgroundObject {
    width = 16;
    height = 16;

    constructor(imagePath,x,y) {
        super().loadImage(imagePath);
        this.x  =  x;
        this.y = y;
    }
}