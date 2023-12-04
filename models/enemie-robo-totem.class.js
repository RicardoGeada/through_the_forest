class RoboTotem extends MovableObject{
    width = 16;
    height = 32;
    y = 208 - this.height - 17;

    IMAGES_ARMORED_WALKING = [
        'img/2.enemies/robo_totem/armored/Walk/walk_1.png',
        'img/2.enemies/robo_totem/armored/Walk/walk_2.png',
    ]

    IMAGES_HURT_HURT = [
        'img/2.enemies/robo_totem/hurt/Hurt/hurt.png',
    ]

    IMAGES_HURT_WALKING = [
        'img/2.enemies/robo_totem/hurt/Walking/walk_1.png',
        'img/2.enemies/robo_totem/hurt/Walking/walk_2.png',
    ]

    constructor() {
        super().loadImage('img/2.enemies/robo_totem/armored/Standing/standing.png');
        this.loadImages(this.IMAGES_ARMORED_WALKING);
        this.loadImages(this.IMAGES_HURT_HURT);
        this.loadImages(this.IMAGES_HURT_WALKING);
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
        // MOVEMENT
        let movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // ANIMATION
        let animationInterval = setInterval(() => {
            if(this.isDead()) {
                this.speedX = 0;
                this.playAnimation(this.IMAGES_HURT_HURT);
            }
            if(this.isHurt() && this.hp >= 1 && this.matchesFrameRate(4)) {
                this.speedX = -0.25;
                clearInterval(movementInterval);
                clearInterval(animationInterval);
                this.playAnimation(this.IMAGES_HURT_HURT);
                
                this.y += 16;
                this.height = 16;
                this.offset.top = 0;
                
                setTimeout (() => {
                    this.animate();
                    this.speedX = 0.25;
                }, 250);
            } else if(this.hp == 2 && this.matchesFrameRate(4)) {
                this.playAnimation(this.IMAGES_ARMORED_WALKING);
            } else if(this.hp == 1 && this.matchesFrameRate(4)) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
            };
            this.framesCounter++;
        }, 1000 / 60);
    }
}