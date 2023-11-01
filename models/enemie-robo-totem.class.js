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
        this.offset = {
            top: 9,
            bottom: 0,
            left: 0,
            right: 0,
        };
        this.x = 100 + Math.random() * 500;
        this.speedX = 0.25;
        this.hp = 2;
        this.dmg = 1;
        this.animate();
    }

    animate() { 
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}