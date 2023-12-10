class HealthBar extends UIObject {
    world;
    maxHealth;
    unit;

    IMAGES_HEART = [
        './img/5.ui/health/health_active.png',
        './img/5.ui/health/health_inactive.png',
    ];

    healthbarImages = [];


    constructor({unit,x,y,world}) {
        super();
        this.loadImage('./img/5.ui/empty/empty.png');
        this.loadImages(this.IMAGES_HEART);
        this.maxHealth = 5;
        this.unit = unit;
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.setMaxHealth();
        setTimeout(() => {
            this.updateHealthbar();
        }, 100);
        this.updatePosition();
        
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
        let lostLives = this.unit.hp == undefined ? 0 : this.maxHealth - this.unit.hp;
        return lostLives;
    }

    setMaxHealth() {
        setTimeout(()=>{
            this.maxHealth = this.unit.hp
        }, 1000 / 60);
    }

    updatePosition() {
        setInterval(() => {
            if (this.unit instanceof Endboss) {
                this.x = this.unit.x + (this.unit.width) * 0.5 - (this.width * 0.5);
                this.y = this.unit.y - this.height;
            }
        }, 1000 / 60);
   
    }
}

