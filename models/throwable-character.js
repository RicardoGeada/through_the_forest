class ThrowableCharacter extends ThrowableObject {

  IMAGES_EXPLODE = [
    'img/1.hero/Ranged_Attack_Missile/missile_1.png',
    'img/1.hero/Ranged_Attack_Missile/missile_2.png',
    'img/1.hero/Ranged_Attack_Missile/missile_3.png',
    'img/1.hero/Ranged_Attack_Missile/missile_4.png',
    'img/1.hero/Ranged_Attack_Missile/missile_5.png',
    'img/1.hero/Ranged_Attack_Missile/missile_6.png',
    'img/1.hero/Ranged_Attack_Missile/missile_7.png',
    'img/1.hero/Ranged_Attack_Missile/missile_8.png',
  ];

  SOUND_EXPLOSION = new Audio('./audio/1.hero/hero_explosion.wav')

  constructor(x,y,directionRightToLeft) {
    super(x,y,directionRightToLeft);
    this.loadImage('img/1.hero/Ranged_Attack_Missile/missile_1.png');
    this.loadImages(this.IMAGES_EXPLODE);
    this.dmg = 1;
    this.width = 16;
    this.height = 16;
    this.acceleration = 1;
  }

  explode() {
    this.playthroughAnimationCycle(this.IMAGES_EXPLODE,1000 / 35);
    playSound({sound: this.SOUND_EXPLOSION, playbackRate: 1, volume: 0.5})
  }

}
