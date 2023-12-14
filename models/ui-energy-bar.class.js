class EnergyBar extends UIObject {
    world;
    maxEnergy = 3;

    IMAGES_ENERGY = [
        './img/5.ui/energy/energy_active.png',
        './img/5.ui/energy/energy_inactive.png',
    ]

    energybarImages = [];

    constructor() {
        super();
        this.loadImage('./img/5.ui/empty/empty.png');
        this.loadImages(this.IMAGES_ENERGY);
        this.x = 10;
        this.y = 20;
        this.setImages();
        setTimeout(() => {
            this.updateEnergybar();
        }, 100);
    }


    /**
     * set up images
     */
    setImages() {
        this.energybarImages = [];
        for (let i = 0; i < this.maxEnergy; i++) {
            if (this.maxEnergy - i > this.usedEnergy()) {
                this.energybarImages.push(this.imageCache['./img/5.ui/energy/energy_active.png']);
            } else {
                this.energybarImages.push(this.imageCache['./img/5.ui/energy/energy_inactive.png']);
            }     
        }
    }


    /**
     * return the number of the used energy of the unit
     * @returns number
     */
    usedEnergy() {
        let usedEnergy = this.world?.character.energy == undefined ? 0 : this.maxEnergy - this.world.character.energy;
        return usedEnergy;
    }


    /**
     * update the energybar
     */
    updateEnergybar() {
        setInterval(() => {
            this.setImages();
            this.img = this.combineImages(this.energybarImages);
        }, 1000 / 12);
    }

}