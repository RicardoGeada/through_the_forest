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
        new Coin(32 * 16, 208 - 10 * 16),
        new Coin(50 * 16, 208 - 7 * 16),
        new Coin(65 * 16, 208 - 2 * 16),
        new Coin(72.5 * 16, 208 - 10 * 16),
        
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
            new GroundSmallBlock({x: i * 16, y: 192}),
        );   
    }
    background.push(
        new GroundMediumBlock({x: 25 * 16, y: 208 - 48}),
        new GroundBigBlock({x: 17 * 16, y: 208 - 48}),
        new GroundBigBlock({x: 45 * 16, y: 208 - 48}),
        new GroundBigBlock({x: 48 * 16, y: 208 - 48}),
        new BrickSmallBlock({x: 22 * 16, y: 208 - 5 * 16}),
        new BrickSmallBlock({x: 24 * 16, y: 208 - 7 * 16}),
        new BrickSmallBlock({x: 70 * 16, y: 208 - 7 * 16}),
        new BrickSmallBlock({x: 75 * 16, y: 208 - 3 * 16}),
        new StoneSmallBlock({x: 32 * 16, y: 208 - 9 * 16}),
        new StoneSmallBlock({x: 39 * 16, y: 208 - 2 * 16}),
        new StoneSmallBlock({x: 50 * 16, y: 208 - 4 * 16}),
        new StoneSmallBlock({x: 50 * 16, y: 208 - 5 * 16}),
        new StoneSmallBlock({x: 50 * 16, y: 208 - 6 * 16}),
        new StoneSmallBlock({x: 64 * 16, y: 208 - 2 * 16}),
        new StoneSmallBlock({x: 65 * 16, y: 208 - 3 * 16}),
        new StoneSmallBlock({x: 66 * 16, y: 208 - 2 * 16}),
        new StoneSmallBlock({x: 66 * 16, y: 208 - 3 * 16}),
        new StoneSmallBlock({x: 66 * 16, y: 208 - 4 * 16}),
        new TimerSmallBlock({x: 49 * 16, y: 208 - 4 * 16}),
        new TimerSmallBlock({x: 72.5 * 16, y: 208 - 5 * 16}),
        new TimerSmallBlock({x: 72.5 * 16, y: 208 - 9 * 16}),
    );  
    return background;
}