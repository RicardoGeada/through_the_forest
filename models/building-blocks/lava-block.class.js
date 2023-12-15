class LavaBlock extends BuildingBlock {

    IMAGES = [
        'img/4.background/5 - Misc. universal tiles/lava_1.png',
        'img/4.background/5 - Misc. universal tiles/lava_2.png',
        'img/4.background/5 - Misc. universal tiles/lava_3.png',
        'img/4.background/5 - Misc. universal tiles/lava_4.png',
    ]

    constructor({x,y}) {
        super('img/4.background/5 - Misc. universal tiles/lava_1.png',x,y,16,32);
        this.loadImages(this.IMAGES);
        this.dmg = 100;
        this.isAttacking = true;
        this.hitbox.collision = {
            top: 6,
            bottom: 0,
            left: 0,
            right: 0,
        }
        this.hitbox.melee = {
            top: 5,
            bottom: 0,
            left: 0,
            right: 0,
        }
        this.animate();
    }


    animate() {
        this.animationInterval = setInterval(() => this.playAnimation(this.IMAGES), 1000 / 4);
    }
}