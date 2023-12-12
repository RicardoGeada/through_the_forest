class Fruit extends MovableObject {

   IMAGES = [
    'img/6.collectables/fruits/apple.png',
   ] 

   SOUND_COLLECT = new Audio('./audio/6.collectables/fruit/eat_fruit.mp3');

   constructor({x,y}) {
    super();
    this.loadImage('img/6.collectables/fruits/apple.png');
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.offset = {
        top: 8,
        bottom: 0,
        left: 4,
        right: -4,
      };
   }
}