class Level {
    backgroundObjects;
    enemies;
    level_end_x;
    collectables;

    constructor(backgroundObjects,enemies,level_end_x,collectables) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.level_end_x =level_end_x;
        this.collectables = collectables;
    }

}

