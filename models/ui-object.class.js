class UIObject extends DrawableObject {
    world;

    IMAGES_NUMBERS = [
        'img/5.ui/numbers/number_0.png',
        'img/5.ui/numbers/number_1.png',
        'img/5.ui/numbers/number_2.png',
        'img/5.ui/numbers/number_3.png',
        'img/5.ui/numbers/number_4.png',
        'img/5.ui/numbers/number_5.png',
        'img/5.ui/numbers/number_6.png',
        'img/5.ui/numbers/number_7.png',
        'img/5.ui/numbers/number_8.png',
        'img/5.ui/numbers/number_9.png',
    ]

    IMAGES_EMPTY = [
        'img/5.ui/empty/empty.png',
    ]

    combineImages(images) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;

        images.forEach((img) => {
            width += img.width;
            height = Math.max(height,img.height); 
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
}