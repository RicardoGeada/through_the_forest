class RoboTotem extends MovableObject{
    width = 16;
    height = 32;
    awake = true;


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

    constructor({x,y}) {
        super().loadImage('img/2.enemies/robo_totem/armored/Standing/standing.png');
        this.loadImages(this.IMAGES_ARMORED_WALKING);
        this.loadImages(this.IMAGES_HURT_HURT);
        this.loadImages(this.IMAGES_HURT_WALKING);
        this.hitbox.collision = {
            top: 9,
            bottom: 0,
            left: 0,
            right: 0,
        };
        this.x = x;
        this.y = y;
        this.speedX = 0.25;
        this.hp = 2;
        this.dmg = 1;
        this.animate();
    }

    /**
     * animate
     */
    animate() { 
        this.movementInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
        this.animationInterval = setInterval(() => this.animateCharacter() , 1000 / 4);
    }


    /**
     * physical animation
     */
    moveCharacter() {
        this.moveLeft();
    }


    /**
     * visual animation
     */
    animateCharacter() {
        if(this.isDead()) {
            this.speedX = 0;
            this.playthroughAnimationCycle(this.IMAGES_HURT_HURT, 1000 / this.IMAGES_HURT_HURT);
            this.clearIntervals();
            setTimeout(() => this.dead = true, 250);
        }
        if(this.isHurt() && this.hp == 1) {
            this.animationHurt();
        } else if(this.hp == 2) {
            this.playAnimation(this.IMAGES_ARMORED_WALKING);
        } else if(this.hp == 1) {
            this.playAnimation(this.IMAGES_HURT_WALKING);
        };
        this.framesCounter++;
    }

    
    /**
     * hurt animation
     */
    animationHurt() {
        // this.speedX = -0.25;
        this.clearIntervals();
        this.setUpHurtForm();
        this.playthroughAnimationCycle(this.IMAGES_HURT_HURT, 1000 / this.IMAGES_HURT_HURT); 
        setTimeout (() => {
            this.animate();
            // this.speedX = 0.25;
        }, 250);
    }


    /**
     * set up the hurt form for the robototem
     */
    setUpHurtForm() {
        this.y += 16;
        this.height = 16;
        this.hitbox.collision.top = 0; 
    }
}