class RoboTotem extends MovableObject{
    width = 16;
    height = 32;

    IMAGES_WALKING = [
        'img/2.enemies/robo_totem/armored/Walk/walk_1.png',
        'img/2.enemies/robo_totem/armored/Walk/walk_2.png',
    ]

    constructor() {
        super().loadImage('img/2.enemies/robo_totem/armored/Standing/standing.png');
        this.loadImages(this.IMAGES_WALKING)
        this.x = 100 + Math.random() * 500;
        this.y = 208 - this.height - 16;
        this.speed = 0.25;
        this.animate(this.IMAGES_WALKING);
        this.moveLeft(); 
    }

    animate(stateImages) { 
        setInterval(() => {
            let path = stateImages[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage == stateImages.length - 1 ? this.currentImage = 0 : this.currentImage++;
        }, 1000 / 4);
    }

    // movement() {
    //     setInterval(() => {
    //         this.img.src.includes('walk_1') ? this.img.src = this.IMAGES_WALKING[1] : this.img.src = this.IMAGES_WALKING[0];
    //     }, 1000 / 3);
    // }
}