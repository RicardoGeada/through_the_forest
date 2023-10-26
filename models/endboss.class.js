class Endboss extends MovableObject {
    width = 32;
    height = 32;
    y = 208 - this.height - 16;
    
    IMAGES_WALKING = [
        'img/3.boss/Skeleton/Walk/walk_1.png',
        'img/3.boss/Skeleton/Walk/walk_2.png',
        'img/3.boss/Skeleton/Walk/walk_3.png',
        'img/3.boss/Skeleton/Walk/walk_4.png',
        'img/3.boss/Skeleton/Walk/walk_5.png',
        'img/3.boss/Skeleton/Walk/walk_6.png',
    ];

    constructor()  {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200;
        this.animate();
    }

    animate() { 
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}