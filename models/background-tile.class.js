class BackgroundTile extends BackgroundObject {
    solid = true;

    constructor(imagePath,x,y,width,height) {
        super({imagePath,x,y});
        this.width = width;
        this.height = height;
    }
}