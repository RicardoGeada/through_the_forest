let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];

function init() {
    canvas = document.getElementById('canvas');
}



function startGame() {
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
    world = new World(canvas,keyboard);
}



//#region Eventlistener for Control Keys / Buttons
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


    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })

    document.getElementById('btn-ranged-attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RANGED_ATTACK = true;
    })

    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })

    document.getElementById('btn-ranged-attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RANGED_ATTACK = false;
    })
//#endregion


 
function setStoppableInterval(fn,time) {
    let id = setInterval(fn,time);
    intervalIDs.push(id);
}

function stopIntervals() {
    intervalIDs.forEach((interval) => {
        clearInterval(interval);
    })
}


function fullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        let fullscreen = document.getElementById('fullscreen');
        openFullscreen(fullscreen);
    }
}


/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}
