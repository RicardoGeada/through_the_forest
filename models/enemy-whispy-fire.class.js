class WhispyFire extends MovableObject{
    width = 32;
    height = 32;
    awake = true;


    IMAGES_WEAK_FLICKER = [
        './img/2.enemies/wispy_fire/weak_flicker/weak_flicker_1.png',
        './img/2.enemies/wispy_fire/weak_flicker/weak_flicker_2.png',
        './img/2.enemies/wispy_fire/weak_flicker/weak_flicker_3.png',
        './img/2.enemies/wispy_fire/weak_flicker/weak_flicker_4.png',
        './img/2.enemies/wispy_fire/weak_flicker/weak_flicker_5.png',
    ]

    IMAGES_IDLE_FLICKER = [
        './img/2.enemies/wispy_fire/idle_flicker/idle_1.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_2.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_3.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_4.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_5.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_6.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_7.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_8.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_9.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_10.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_11.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_12.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_13.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_14.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_15.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_16.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_17.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_18.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_19.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_20.png',
        './img/2.enemies/wispy_fire/idle_flicker/idle_21.png',
    ]

    IMAGES_DEATH = [
        './img/2.enemies/wispy_fire/death/death_1.png',
        './img/2.enemies/wispy_fire/death/death_2.png',
        './img/2.enemies/wispy_fire/death/death_3.png',
        './img/2.enemies/wispy_fire/death/death_4.png',
        './img/2.enemies/wispy_fire/death/death_5.png',
        './img/2.enemies/wispy_fire/death/death_6.png',
        './img/2.enemies/wispy_fire/death/death_7.png',
        './img/2.enemies/wispy_fire/death/death_8.png',
        './img/2.enemies/wispy_fire/death/death_9.png',
        './img/2.enemies/wispy_fire/death/death_10.png',
    ]

    SOUND_DEATH = new Audio('./audio/2.enemies/whispy_fire/death.wav');

    constructor({x,y}) {
        super().loadImage('./img/2.enemies/wispy_fire/idle_flicker/idle_1.png');
        this.loadImages(this.IMAGES_WEAK_FLICKER);
        this.loadImages(this.IMAGES_IDLE_FLICKER);
        this.loadImages(this.IMAGES_DEATH);
        this.hitbox.collision = {
            top: 8,
            bottom: 0,
            left: 8,
            right: -8,
        };
        this.x = x;
        this.y = y;
        this.hp = 1;
        this.dmg = 1;
        this.animate();
    }

    animate() {
        this.animationInterval = setStoppableInterval(() => {
            if (this.isDead()) {
                this.playthroughAnimationCycle(this.IMAGES_DEATH,1000 / this.IMAGES_DEATH.length);
                setTimeout(() => playSound({sound: this.SOUND_DEATH, playbackRate: 1}), 250);
                setTimeout(() =>  this.dead = true, 1000);
                this.clearIntervals();
            } else if (this.matchesFrameRate(20)) {
                this.playAnimation(this.IMAGES_IDLE_FLICKER);
            }
            this.framesCounter++;
        }, 1000 / 60);
    }
}