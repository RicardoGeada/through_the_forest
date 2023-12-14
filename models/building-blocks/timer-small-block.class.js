class TimerSmallBlock extends BuildingBlock {

    IMAGES = [
        'img/4.background/5 - Misc. universal tiles/timer_block.png',
        'img/5.ui/empty/empty.png',
    ]

    constructor({x,y}) {
        super('img/4.background/5 - Misc. universal tiles/timer_block.png',x,y,16,16);
        this.loadImages(this.IMAGES);
        setInterval(() => {
            this.update();   
        }, 1000 / 60);
    }

    update() {
        if (this.solid) {
            setTimeout(() => {
                this.solid = false;
                this.img = this.imageCache['img/5.ui/empty/empty.png'];
            }, 2000);
        } else if (!this.solid) {
            setTimeout(() => {
                this.solid = true;
                this.img = this.imageCache['img/4.background/5 - Misc. universal tiles/timer_block.png'];
            }, 2000);
        }
    }
}