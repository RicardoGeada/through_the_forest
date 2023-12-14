class ThrowableSkeleton extends ThrowableObject {

    IMAGES = [
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_1.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_2.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_3.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_4.png',
    ]

    constructor({x,y,directionRightToLeft}) {
        super({x,y,directionRightToLeft});
        this.loadImage('img/3.boss/Skeleton/Spinning_Bone/spinning_bone_1.png');
        this.loadImages(this.IMAGES);
        this.dmg = 2;
        this.width = 16;
        this.height = 16;
        this.acceleration = 1;
        this.hitbox.collision = {
            top: 2,
            bottom: -2,
            left: 2,
            right: -2,
        }
        this.animate();
    }

    /**
     * animate 
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.framesCounter++;
        }, 1000 / 16);
    }
}