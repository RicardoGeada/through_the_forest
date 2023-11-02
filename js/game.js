let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard);

    // console.log('My Character is', world['character']);
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {keyboard.LEFT = true};
    if (e.key == 'ArrowRight') {keyboard.RIGHT = true};
    if (e.key == 'ArrowUp') {keyboard.UP = true};
    if (e.key == 'ArrowDown') {keyboard.DOWN = true};
    if (e.key == ' ') {keyboard.SPACE = true};
    if (e.key == 'q') {keyboard.MELEE_ATTACK = true};
    if (e.key == 'w') {keyboard.RANGED_ATTACK = true};

});

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowLeft') {keyboard.LEFT = false};
    if (e.key == 'ArrowRight') {keyboard.RIGHT = false};
    if (e.key == 'ArrowUp') {keyboard.UP = false};
    if (e.key == 'ArrowDown') {keyboard.DOWN = false};
    if (e.key == ' ') {keyboard.SPACE = false};
    if (e.key == 'q') {keyboard.MELEE_ATTACK = false};
    if (e.key == 'w') {keyboard.RANGED_ATTACK = false};
});


 
function setStoppableInterval(fn,time) {
    let id = setInterval(fn,time);
    intervalIDs.push(id);
}

function stopIntervals() {
    intervalIDs.forEach((interval) => {
        clearInterval(interval);
    })
}
