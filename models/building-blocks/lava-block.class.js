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
        this.dmg = 0;
        this.hitbox.collision = {
            top: 6,
            bottom: 0,
            left: 0,
            right: 0,
        }
        // this.solid = false;
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if(this.matchesFrameRate(4)) {
                this.playAnimation(this.IMAGES); 
            }
            this.framesCounter++;
        }, 1000 / 60);
    }
}