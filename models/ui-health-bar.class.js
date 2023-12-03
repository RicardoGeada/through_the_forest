class HealthBar extends UIObject {
    world;
    maxHealth;

    IMAGES_HEART = [
        './img/5.ui/health/health_active.png',
        './img/5.ui/health/health_inactive.png',
    ];

    healthbarImages = [];


    constructor() {
        super();
        this.loadImage('./img/5.ui/empty/empty.png');
        this.loadImages(this.IMAGES_HEART);
        this.maxHealth = 5;
        this.x = 10;
        this.y = 10;
        this.width = 0;
        this.height = 0;
        this.setMaxHealth();
        setTimeout(() => {
            this.updateHealthbar();
        }, 100)
        
    }

    setHealthbarImages() {
        for (let i = 0; i < this.maxHealth; i++) {
            if (this.maxHealth - i > this.lostLives()) { 
                this.healthbarImages.push(this.imageCache['./img/5.ui/health/health_active.png']);
            } else {
                this.healthbarImages.push(this.imageCache['./img/5.ui/health/health_inactive.png']);
            }
        }
    }

    updateHealthbar() {
        setInterval(() => {
            this.healthbarImages = [];
            this.setHealthbarImages();
            this.img = this.combineImages(this.healthbarImages);
        }, 1000 / 12);
    }

    lostLives() {
        let lostLives = this.world?.character.hp == undefined ? 0 : this.maxHealth - this.world.character.hp;
        return lostLives;
    }

    setMaxHealth() {
        setTimeout(()=>{
            this.maxHealth = this.world.character.hp
        }, 1000 / 60);
    }
}

