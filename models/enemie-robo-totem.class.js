class RoboTotem extends MovableObject{

    constructor() {
        super().loadImage('img/2.enemies/robo_totem/armored/Standing/standing.png');
        this.x = 100 + Math.random() * 500;
        this.y = 208 - 32 - 16;
        this.width = 16;
        this.height = 32;
    }
}