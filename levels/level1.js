const level1 = new Level(
    generateBackground(),
    [
        new RoboTotem(),    
        new RoboTotem(),    
        new RoboTotem(),
        new Endboss(),    
    ],
    (3 * 288) + 32,
    [
        new Coin(100,176),
        new Coin(200,120),
        new Coin(500,176),
        new Fruit(250,176),
    ]
);

function generateBackground() {
    let background = [];
    for (let i = 0; i <  4; i++) {
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
    for (let i = 0; i < (288 / 16) * 4; i++) {
        background.push(
            new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',i * 16,192),
        );   
    }
    background.push(
        new BackgroundTile('img/4.background/2 - Autumn Forest/Terrain/mid.png',7* 16,192 - 16),
    );  
    return background;
}