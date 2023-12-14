class GroundBigBlock extends BuildingBlock {
    
    constructor({x,y}) {
        super('img/4.background/2 - Autumn Forest/Terrain/ground_big.png',x,y,48,48);
        this.hitbox.vision = {
            left: 0,
            right: 0,
            top: -1,
            bottom: 0,
        }
    }
}