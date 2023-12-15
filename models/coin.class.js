class Coin extends MovableObject {

    IMAGES = [
        'img/6.collectables/coin/coin_1.png',
        'img/6.collectables/coin/coin_2.png',
        'img/6.collectables/coin/coin_3.png',
        'img/6.collectables/coin/coin_4.png',
    ]

    SOUND_COLLECT = new Audio('./audio/6.collectables/coin/coin_collect.mp3')

    constructor({x,y}) {
        super();
        this.loadImage('img/6.collectables/coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.width = 16;
        this.height = 16;
        this.x = x;
        this.y = y;
        this.hitbox.collision = {
            top: 1,
            bottom: 0,
            left: 1,
            right: -1,
        }
        this.animate();
    }

    /**
     * animate
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.matchesFrameRate(12)) {
                this.playAnimation(this.IMAGES);
            }
            this.framesCounter++;
        }, 1000 / 60);
    }
}