let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let audio = {muted: false};
let music = {
    selected: '',
    background: new Audio('./audio/0.music/Wild Wind, Take Me Home.mp3'),
    boss: new Audio('./audio/0.music/boss_music.mp3'),
    gameover: new Audio('./audio/0.music/game_over.mp3'),
    victory: new Audio('./audio/0.music/victory.mp3'),
};


/**
 * initialize the page
 */
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('btn-start').disabled = false;
}


//#region start / end game

    /**
     * start the game
     */
    function startGame() {
        let startScreen = document.getElementById('startscreen');
        startScreen.classList.add('d-none');
        world = new World(canvas,keyboard);
        playMusic({sound: music.background, playbackRate: 1, muted: false, loop: true, volume: 0.5});
    }


    /**
     * play again / restart / reload the page
     */
    function restart() {
        location.reload();
    }


    /**
     * generate the endscreen
     * @param {boolean} win - is the player victorious or not
     */
    function generateEndscreen(win) {
        let endscreen = document.getElementById('endscreen');
        endscreen.classList.remove('d-none');
        endscreen.innerHTML = '';
        endscreen.innerHTML = win ? endscreenVictoryHTML() : endscreenGameOverHTML();
    }


    /**
     * endscreen Victory Screen
     * @returns HTML
     */
    function endscreenVictoryHTML() {
        return /*html*/`
            <div class="container">
                <h1 class="headline">VICTORY</h1>
                <button onclick="restart()">Play again</button>  
            </div>
        `;
    }


    /**
     * endscreen Game Over Screen
     * @returns HTML
     */
    function endscreenGameOverHTML() {
        return /*html*/`
            <div class="container">
                <h1 class="headline">GAME OVER</h1>
                <button onclick="restart()">Play again</button>  
            </div>
        `;
    }

//#endregion

//#region eventlistener for player controls (keys & buttons)

    // keys
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

    // touch buttons
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('gamepad').addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const button = document.elementFromPoint(touch.clientX, touch.clientY);
        if (button.id == 'btn-left') {
            keyboard.RIGHT = false;
            keyboard.LEFT = true;
        } else if (button.id == 'btn-right') {
            keyboard.LEFT = false;
            keyboard.RIGHT = true;
        } else {
            keyboard.LEFT = false;
            keyboard.RIGHT = false;
        }
    })

    document.getElementById('gamepad').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
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

/**
 * set interval and save id in intervalIDs-Array
 * @param {Function} fn  
 * @param {number} time - time for the interval
 * @returns number (id)
 */
function setStoppableInterval(fn,time) {
    let id = setInterval(fn,time);
    intervalIDs.push(id);
    return id;
}


/**
 * clear all intervals inside intervalIDs-Array
 */
function stopIntervals() {
    intervalIDs.forEach((interval) => {
        clearInterval(interval);
    })
}

//#region sound

    /**
 * play sound
 * @param {HTMLAudioElement} sound - the sound
 * @param {number} playbackRate - slower < 1 < faster playback rate
 * @param {number} volume - 0 - 1
 * @param {boolean} muted - mute / unmute
 * @param {boolean} loop - repeat the sound after playtrough
 */
    function playSound({sound,playbackRate,volume,muted,loop}) {
        sound.volume = volume ? volume : 1;
        sound.muted = muted ? muted : audio.muted;
        sound.playbackRate = playbackRate ? playbackRate : 1;
        sound.loop = loop ? loop : false;
        sound.play() ? null : sound.play();
    }


    /**
 * play music and pause previous music
 * @param {HTMLAudioElement} sound - the music e.g. music.background
 * @param {number} playbackRate - slower < 1 < faster playback rate
 * @param {number} volume - 0 - 1
 * @param {boolean} muted - mute / unmute
 * @param {boolean} loop - repeat the music after playtrough
 */
    function playMusic({sound,playbackRate,volume,muted,loop}) {
        if (music.selected instanceof HTMLAudioElement) music.selected.pause();
        playSound({sound,playbackRate,volume,muted,loop});
        music.selected = sound;
    }

//#endregion 

//#region settings

    /**
     * toggle fullscreen
     */
    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            let fullscreen = document.getElementById('fullscreen');
            openFullscreen(fullscreen);
        }
    }



    /**
     * open element in fullscreen
     * @param {HTMLElement} elem - the element that should be in fullscreen
     */
    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
    }


    /**
     * toggle between mute and unmute
     */
    function toggleAudio() {
        audio.muted = audio.muted ? unmute() : mute();
    }


    /**
     * mute the music
     * @returns true
     */
    function mute() {
        let img = document.getElementById('btn-audio-img');
        img.src = './img/5.ui/settings/speaker-mute.png';
        music.selected.pause();
        return true;
    }


    /**
     * unmute the music
     * @returns false
     */
    function unmute() {
        let img = document.getElementById('btn-audio-img');
        img.src = './img/5.ui/settings/speaker-unmute.png';
        music.selected.play();
        return false;
    }


    /**
     * show / hide controls
     */
    function toggleControls() {
        let gameControls = document.getElementById('game-controls');
        gameControls.classList.toggle('d-none');
    }
    
//#endregion


