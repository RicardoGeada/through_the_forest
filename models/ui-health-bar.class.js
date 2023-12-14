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
        this.unit = unit;
        this.world = world;
        this.x = x;
        this.y = y;
        this.setMaxHealth();
        setTimeout(() => {
            this.updateHealthbar();
        }, 100);
        this.updatePosition();   
    }


    /**
     * set up healthbar images
     */
    setHealthbarImages() {
        this.healthbarImages = [];
        for (let i = 0; i < this.maxHealth; i++) {
            if (this.maxHealth - i > this.lostLives()) { 
                this.healthbarImages.push(this.imageCache['./img/5.ui/health/health_active.png']);
            } else {
                this.healthbarImages.push(this.imageCache['./img/5.ui/health/health_inactive.png']);
            }
        }
    }


    /**
     * update the healthbar
     */
    updateHealthbar() {
        setInterval(() => {
            this.setHealthbarImages();
            this.img = this.combineImages(this.healthbarImages);
        }, 1000 / 12);
    }


    /**
     * return the number of the lost lives of the unit
     * @returns number
     */
    lostLives() {
        let lostLives = this.unit.hp == undefined ? 0 : this.maxHealth - this.unit.hp;
        return lostLives;
    }


    /**
     * set the max health of the unit
     */
    setMaxHealth() {
        setTimeout(()=>{
            this.maxHealth = this.unit.hp
        }, 1000 / 60);
    }

    
    /**
     * update the healthbar position to follow the unit
     */
    updatePosition() {
        setInterval(() => {
            if (this.unit instanceof Endboss) {
                this.x = this.unit.x + (this.unit.width) * 0.5 - (this.width * 0.5);
                this.y = this.unit.y - this.height;
            }
        }, 1000 / 60);
   
    }
}

