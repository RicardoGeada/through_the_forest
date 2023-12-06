class HouseBlock extends BackgroundTile {

    IMAGES = [
        'img/4.background/5 - Misc. universal tiles/house_1.png',
        'img/4.background/5 - Misc. universal tiles/house_2.png'
    ]

    constructor({x,y}) {
        super('img/4.background/5 - Misc. universal tiles/house_1.png',x,y,112,96);
        this.loadImages(this.IMAGES);
        this.solid = false;
        this.offset = {
            top: 64,
            bottom: 0,
            left: 20,
            right: -68,
        }
    }
}