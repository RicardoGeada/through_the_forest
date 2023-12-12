let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let audio = {muted: false};
let music = {
    background: new Audio('./audio/0.music/Wild Wind, Take Me Home.mp3'),
    boss: new Audio('./audio/0.music/boss_music.mp3'),
    gameover: new Audio('./audio/0.music/game_over.mp3'),
    victory: new Audio('./audio/0.music/victory.mp3'),
};

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
    world = new World(canvas,keyboard);
    playSound({sound: music.background, playbackRate: 1, muted: false, loop: true, volume: 0.5});
}

function restart() {
    location.reload();
}

function generateEndscreen({win}) {
    let endscreen = document.getElementById('endscreen');
    endscreen.classList.remove('d-none');
    endscreen.innerHTML = '';
    endscreen.innerHTML = win ? endscreenVictoryHTML() : endscreenGameOverHTML();
}

function endscreenVictoryHTML() {
    return /*html*/`
        <div class="container">
            <h1 class="headline">VICTORY</h1>
            <button onclick="restart()">Play again</button>  
        </div>
    `;
}

function endscreenGameOverHTML() {
    return /*html*/`
        <div class="container">
            <h1 class="headline">GAME OVER</h1>
            <button onclick="restart()">Play again</button>  
        </div>
    `;
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

    document.getElementById('btn-melee-attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.MELEE_ATTACK = true;
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

    document.getElementById('btn-melee-attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.MELEE_ATTACK = false;
    })

    document.getElementById('btn-ranged-attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RANGED_ATTACK = false;
    })
//#endregion


 
function setStoppableInterval(fn,time) {
    let id = setInterval(fn,time);
    intervalIDs.push(id);
    console.log('stoppable interval setted')
}

function stopIntervals() {
    intervalIDs.forEach((interval) => {
        clearInterval(interval);
    })
}

function playSound({sound,playbackRate,volume,muted,loop}) {
    sound.volume = volume ? volume : 1;
    sound.muted = muted ? muted : audio.muted;
    sound.playbackRate = playbackRate;
    sound.loop = loop ? loop : false;
    sound.play() ? null : sound.play();
}



//#region settings
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


    function toggleAudio() {
        audio.muted = audio.muted ? unmute() : mute();
    }

    function mute() {
        let img = document.getElementById('btn-audio-img');
        img.src = './img/5.ui/settings/speaker-mute.png';
        if (!music.background.paused) music.background.pause();
        return true;
    }

    function unmute() {
        let img = document.getElementById('btn-audio-img');
        img.src = './img/5.ui/settings/speaker-unmute.png';
        if (music.background.paused) music.background.play();
        return false;
    }


    function toggleControls() {
        let gameControls = document.getElementById('game-controls');
        gameControls.classList.toggle('d-none');
    }
//#endregion


