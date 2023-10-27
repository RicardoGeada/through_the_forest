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

    IMAGES_JUMPING = [
        'img/1.hero/Jump/jump_1.png',
        'img/1.hero/Jump/jump_2.png',
        'img/1.hero/Jump/jump_3.png',
        'img/1.hero/Jump/jump_4.png',
        'img/1.hero/Jump/jump_5.png',
        'img/1.hero/Jump/jump_6.png',
        'img/1.hero/Jump/jump_7.png',
        'img/1.hero/Jump/jump_8.png',
    ]

    SOUND_WALK = new Audio('../audio/hero_walk.wav');

    constructor() {
        super().loadImage('img/1.hero/Idle/idle_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.x = 32;
        this.y = 208 - 32 - 16 - 100;
        this.speedX = 1;
        
        this.animate();
        this.applyGravity();
    }

   

    animate() {

        // MOVEMENT
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.flipH = false;
                !this.isAboveGround() ? this.playSound(this.SOUND_WALK,2) : null;
            }
            if (this.world.keyboard.LEFT && this.x > 32) {
                this.moveLeft();
                this.flipH = true;
                !this.isAboveGround() ? this.playSound(this.SOUND_WALK,2) : null;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = this.x - 32;
        }, 1000 /60);
        
        // FRAME BY FRAME ANIMATION
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 12);
    }

    playSound(sound,playbackRate) {
        sound.playbackRate = playbackRate;
        sound.play() ? null : sound.play();
    }
}