class Character extends MovableObject {
    world;
    width = 32;
    height = 32;

    IMAGES_WALKING = [
        'img/1.hero/Walk/walk_1.png',
        'img/1.hero/Walk/walk_2.png',
        'img/1.hero/Walk/walk_3.png',
        'img/1.hero/Walk/walk_4.png',
    ];

    constructor() {
        super().loadImage('img/1.hero/Idle/idle_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 10;
        this.y = 208 - 32 - 16;

        this.animate(this.IMAGES_WALKING);
    }

   

    animate(stateImages) {
         // MOVEMENT
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += 1;
                this.flipH = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= 1;
                this.flipH = true;
            }
        }, 1000 /60);
        
        // FRAME BY FRAME ANIMATION
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let path = stateImages[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage == stateImages.length - 1 ? this.currentImage = 0 : this.currentImage++;
            }
        }, 1000 / 12);
    }

    jump() {

    }
}