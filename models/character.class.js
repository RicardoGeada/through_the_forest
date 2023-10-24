class Character extends MovableObject {
    width = 32;
    height = 32;

    constructor() {
        super().loadImage('img/1.hero/Idle/idle_1.png');
        this.x = 10;
        this.y = 208 - 32 - 16;
    }

    jump() {

    }
}