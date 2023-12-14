class LeafPileBlock extends BuildingBlock {

    IMAGES = [
        'img/4.background/2 - Autumn Forest/autumn_entities/pile_of_leaves_1.png',
        'img/4.background/2 - Autumn Forest/autumn_entities/pile_of_leaves_2.png'
    ]

    constructor({x,y}) {
        super('img/4.background/2 - Autumn Forest/autumn_entities/pile_of_leaves_1.png',x,y,16,16);
        this.loadImages(this.IMAGES);
        this.hp = 1;
        this.solid = false;
        setTimeout(() => {
            this.update(); 
        }, 1000);
    }

    update() {
        setInterval(() => {
           if (this.hp == 1) {
                this.img = this.imageCache[this.IMAGES[0]];
            } else if (this.hp == 0) {
                this.img = this.imageCache[this.IMAGES[1]];
            }
        }, 1000 / 60);
    }
}