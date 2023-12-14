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

    /**
     * update the block
     * - switch between solid and not solid state
     */
    update() {
        if (this.solid) {
            setTimeout(() => this.turnUnsolid(), 2000);
        } else if (!this.solid) {
            setTimeout(() => this.turnSolid(), 2000);
        }
    }

    /**
     * turn block unsolid
     */
    turnUnsolid() {
        this.solid = false;
        this.img = this.imageCache['img/5.ui/empty/empty.png'];
    }


    /**
     * turn block solid
     */
    turnSolid() {
        this.solid = true;
        this.img = this.imageCache['img/4.background/5 - Misc. universal tiles/timer_block.png'];
    }
}