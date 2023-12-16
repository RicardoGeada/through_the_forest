class GroundBigBlock extends BuildingBlock {

    IMAGES = [
        './img/4.background/2 - Autumn Forest/Terrain/ground_big_left.png',
        './img/4.background/2 - Autumn Forest/Terrain/ground_big_mid.png',
        './img/4.background/2 - Autumn Forest/Terrain/ground_big_right.png',
    ]
    
    constructor({x,y,image}) {
        super('./img/4.background/2 - Autumn Forest/Terrain/ground_big_mid.png',x,y,16,48);
        this.loadImage(this.IMAGES[image]);
        this.hitbox.vision = {
            left: 0,
            right: 0,
            top: -1,
            bottom: 0,
        }
    }
}