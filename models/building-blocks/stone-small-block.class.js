class StoneSmallBlock extends BuildingBlock {

    IMAGES = [
        'img/4.background/5 - Misc. universal tiles/stone_block_1.png',
        'img/4.background/5 - Misc. universal tiles/stone_block_2.png',
        'img/4.background/5 - Misc. universal tiles/stone_block_3.png',
    ]

    constructor({x,y}) {
        super('img/4.background/5 - Misc. universal tiles/stone_block_1.png',x,y,16,16);
        this.loadImages(this.IMAGES);
        this.hp = 3;
        setTimeout(() => {
            this.update(); 
        }, 1000);
    }

    update() {
        setInterval(() => {
            if (this.hp == 3) {
                this.img = this.imageCache['img/4.background/5 - Misc. universal tiles/stone_block_1.png'];
            } else if (this.hp == 2) {
                this.img = this.imageCache['img/4.background/5 - Misc. universal tiles/stone_block_2.png'];
            } else if (this.hp == 1) {
                this.img = this.imageCache['img/4.background/5 - Misc. universal tiles/stone_block_3.png'];
                setTimeout(() => this.hp = 0, 250);
            }
        }, 1000 / 60);
    }
}