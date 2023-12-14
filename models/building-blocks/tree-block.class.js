class TreeBlock extends BuildingBlock {

    IMAGES = [
        'img/4.background/2 - Autumn Forest/autumn_entities/tree_1.png',
        'img/4.background/2 - Autumn Forest/autumn_entities/tree_2.png',
    ]

    constructor({x,y,image}) {
        super('img/4.background/2 - Autumn Forest/autumn_entities/tree_1.png',x,y,48,48);
        this.loadImage(this.IMAGES[image]);
        this.solid = false;
    }
}