class ThrowableSkeleton extends ThrowableObject {

    IMAGES = [
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_1.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_2.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_3.png',
        'img/3.boss/Skeleton/Spinning_Bone/spinning_bone_4.png',
    ]

    constructor(x,y,directionRightToLeft) {
        super(x,y,directionRightToLeft);
        this.loadImage('img/3.boss/Skeleton/Spinning_Bone/spinning_bone_1.png');
        this.loadImages(this.IMAGES);
        this.dmg = 0;
        this.width = 16;
        this.height = 16;
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.matchesFrameRate(16)) {
                this.playAnimation(this.IMAGES);
            };
            this.framesCounter++;
        }, 1000 / 60);
    }
}