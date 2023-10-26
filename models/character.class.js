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

    SOUND_WALK = new Audio('../audio/hero_walk.wav');

    constructor() {
        super().loadImage('img/1.hero/Idle/idle_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 32;
        this.y = 208 - 32 - 16;

        this.animate();
    }

   

    animate() {

        // MOVEMENT
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += 1;
                this.flipH = false;
                this.playSound(this.SOUND_WALK,2);
            }
            if (this.world.keyboard.LEFT && this.x > 32) {
                this.x -= 1;
                this.flipH = true;
                this.playSound(this.SOUND_WALK,2);
            }
            this.world.camera_x = this.x - 32;
        }, 1000 /60);
        
        // FRAME BY FRAME ANIMATION
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 12);
    }

    playSound(sound,playbackRate) {
        sound.playbackRate = playbackRate;
        sound.play() ? null : sound.play();
    }

    jump() {

    }
}