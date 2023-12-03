class BackgroundTile extends BackgroundObject {
    width = 16;
    height = 16;
    solid = true;

    constructor(imagePath,x,y,width,height) {
        super(imagePath,x,y);
        this.width = width;
        this.height = height;
    }
}