let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard);

    // console.log('My Character is', world['character']);
}

window.addEventListener('keydown', (e) => {
    keyboard.LEFT = e.key == 'ArrowLeft' ? true : false;
    keyboard.RIGHT = e.key == 'ArrowRight' ? true : false;
    keyboard.UP = e.key == 'ArrowUp' ? true : false;
    keyboard.DOWN = e.key == 'ArrowDown' ? true : false;
    keyboard.SPACE = e.key == ' ' ? true : false;
});

window.addEventListener('keyup', (e) => {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
});