const level1 = new Level({
    backgroundObjects: generateBackground(),
    enemies: [
        new RoboTotem(),    
        new RoboTotem(),    
        new RoboTotem(),
        new Endboss(),    
    ],
    level_end_x: (5 * 288) - 32,
    collectables: [
        new Coin(100,176),
        new Coin(200,120),
        new Coin(500,176),
        new Fruit(250,176),
    ]
}   
);

function generateBackground() {
    let background = [];
    for (let i = 0; i <  6; i++) {
      background.push(
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/6 - Distant_trees.png',i * 288,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/5 - Tree_row_BG_2.png',i * 288,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/4 - Tree_row_BG_1.png',i * 288,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/3 - Bottom_leaf_piles.png',i * 288,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/2 - Trees.png',i * 288,0),
        new BackgroundObject('img/4.background/2 - Autumn Forest/Background parts/1 - Leaf_top.png',i * 288,0),
      );
    }
    // TILES
    for (let i = 0; i < (288 / 16) * 6; i++) {
        background.push(
            new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',i * 16,192,16,16),
        );   
    }
    background.push(
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',48,192 - 48,16,16),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',80,192 - 64,16,16),
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/ground_big.png',7* 16,192 - 32,48,48),
    );  
    return background;
}