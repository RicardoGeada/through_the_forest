class HealthBar extends DrawableObject {
    world;
    maxHealth;

    IMAGES = [
        './img/5.ui/health/health_active.png',
        './img/5.ui/health/health_inactive.png',
    ];

    healthbarImages = [];


    constructor() {
        super();
        this.loadImage('./img/5.ui/health/health_active.png');
        this.loadImages(this.IMAGES);
        this.maxHealth = 5;
        this.setHealthbarImages();
        this.x = 10;
        this.y = 10;
        this.width = 40;
        this.height = 8;
        this.updateHealthbar();
        this.setMaxHealth();
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

    combineImages(images) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;

        images.forEach((img) => {
            width += img.width; // 8
            height = Math.max(height,img.height); // 8
        });

        canvas.width = width;
        canvas.height = height;
        this.width = width;
        this.height = height;

        let x = 0;

        images.forEach((img) => {
            ctx.drawImage(img, x, 0);
            x += img.width;
        })

        let img = new Image();
        img.src = canvas.toDataURL('image/png');
        return img;
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
        }, 1000 / 100);
    }
}

