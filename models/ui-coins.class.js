class UICoins extends UIObject {
    world;
    amount = 0;
    coinsImages = [];

    IMAGES_COIN = [
        './img/5.ui/coins/coin.png',
    ]

    constructor() {
        super();
        this.loadImage('./img/5.ui/coins/coin.png');
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_NUMBERS);
        this.loadImages(this.IMAGES_EMPTY);
        this.x = 288 - 16 - 50;
        this.y = 10;
        this.width = 8;
        this.height = 8;
        setTimeout(() => {
            this.updateCollectedCoins();
        }, 100);
    }

    setImages() {
        let amountAsString = this.amount.toString();
        let paddedString = amountAsString.padStart(4,'0');
        this.coinsImages.push(this.imageCache['./img/5.ui/coins/coin.png']); 
        this.coinsImages.push(this.imageCache['./img/5.ui/empty/empty.png']); 
        Array.from(paddedString).forEach(char => {
            if (char == '0') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_0.png']);
            if (char == '1') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_1.png']);
            if (char == '2') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_2.png']);
            if (char == '3') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_3.png']);
            if (char == '4') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_4.png']);
            if (char == '5') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_5.png']);
            if (char == '6') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_6.png']);
            if (char == '7') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_7.png']);
            if (char == '8') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_8.png']);
            if (char == '9') this.coinsImages.push(this.imageCache['./img/5.ui/numbers/number_9.png']);
        });
    }

    updateCollectedCoins() {
        setInterval(() => {
           this.coinsImages = [];
           this.setImages();
           this.img = this.combineImages(this.coinsImages); 
        }, 1000 / 12);
    };
}