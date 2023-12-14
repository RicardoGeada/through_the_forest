class HouseBlock extends BuildingBlock {

    doorOpen = false;

    IMAGES = [
        'img/4.background/5 - Misc. universal tiles/house_1.png',
        'img/4.background/5 - Misc. universal tiles/house_2.png'
    ]

    constructor({x,y}) {
        super('img/4.background/5 - Misc. universal tiles/house_1.png',x,y,112,96);
        this.loadImages(this.IMAGES);
        this.solid = false;
        this.hp = 1;
        this.hitbox.collision = {
            top: 64,
            bottom: 0,
            left: 20,
            right: -68,
        };
        setInterval(() => this.update(), 1000 / 60);
    }

    /**
     * update images
     */
    update() {     
        if (!this.doorOpen) {
            this.img = this.imageCache[this.IMAGES[0]];
        } else if (this.doorOpen) {
            this.img = this.imageCache[this.IMAGES[1]];
        };
    }
}