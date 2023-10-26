class RoboTotem extends MovableObject{
    width = 16;
    height = 32;
    y = 208 - this.height - 16;

    IMAGES_WALKING = [
        'img/2.enemies/robo_totem/armored/Walk/walk_1.png',
        'img/2.enemies/robo_totem/armored/Walk/walk_2.png',
    ]

    constructor() {
        super().loadImage('img/2.enemies/robo_totem/armored/Standing/standing.png');
        this.loadImages(this.IMAGES_WALKING)
        this.x = 100 + Math.random() * 500;
        this.speed = 0.25;
        this.animate();
        this.moveLeft(); 
    }

    animate() { 
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}