class World {

    character = new Character();
    enemies = [
        new RoboTotem(),    
        new RoboTotem(),    
        new RoboTotem(),    
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            this.ctx.drawImage(enemy.img, enemy.x + i * 100, enemy.y, enemy.width, enemy.height);
        }
    }
}