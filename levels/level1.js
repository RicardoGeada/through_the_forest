const level1 = new Level({
    backgroundObjects: generateBackground(),
    enemies: [
        new RoboTotem({x: 15 * 16, y: 208 - 32 - 17}),    
        new RoboTotem({x: 30 * 16, y: 208 - 32 - 17}),    
        new RoboTotem({x: 35 * 16, y: 208 - 32 - 17}),    
        new RoboTotem({x: 55 * 16, y: 208 - 32 - 17}),    
        new RoboTotem({x: 61 * 16, y: 208 - 32 - 17}),    
        new Endboss(),    
    ],
    level_end_x: (6 * 288) - 32,
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
    for (let i = 0; i <  7; i++) {
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
    for (let i = 0; i < (288 / 16) * 7; i++) {
        if (i < 70 || i > 75) background.push(new GroundSmallBlock({x: i * 16, y: 192, image: 1}),); 
        if (i == 70) background.push(new GroundSmallBlock({x: i * 16, y: 192, image: 2}),); 
        if (i == 75) background.push(new GroundSmallBlock({x: i * 16, y: 192, image: 0}),); 
        ; 
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
        new BoxMediumBlock({x: 40 * 16, y: 208 - 3 * 16}),
        new LavaBlock({x: 71 * 16, y: 208 - 1 * 16}),
        new LavaBlock({x: 72 * 16, y: 208 - 1 * 16}),
        new LavaBlock({x: 73 * 16, y: 208 - 1 * 16}),
        new LavaBlock({x: 74 * 16, y: 208 - 1 * 16}),
        new FenceBigBlock({x: 107 * 16, y: 208 - 2 * 16}),
        new FenceBigBlock({x: 110 * 16, y: 208 - 2 * 16}),
        new HouseBlock({x: 110 * 16, y: 208 - 7 * 16}),
        new LeafPileBlock({x: 107 * 16, y: 208 - 2 * 16}),
        new LeafPileBlock({x: 5 * 16, y: 208 - 2 * 16}),
        new FlowerBlock({x: 113 * 16, y: 208 - 2 * 16}),
        new TreeBlock({x: 14 * 16, y: 208 - 4 * 16, image: 1}),
        new TreeBlock({x: 33 * 16, y: 208 - 4 * 16, image: 0}),
        new TreeBlock({x: 57 * 16, y: 208 - 4 * 16, image: 1}),
        new TreeBlock({x: 108 * 16, y: 208 - 4 * 16, image: 0}),
        
        
    );  
    return background;
}