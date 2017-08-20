/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chorus_js__ = __webpack_require__(1);



(function () {
    this.setup();
    this.animate(0, 0);
}).bind({
    setup: function () {
        this.keynotes = {};
        this.synthInfo = {
            "portamento": 0.01,
            "oscillator": {
                "type": "square"
            },
            "envelope": {
                "attack": 0.005,
                "decay": 0.2,
                "sustain": 0.4,
                "release": 0.4,
            },
            "filterEnvelope": {
                "attack": 0.005,
                "decay": 0.1,
                "sustain": 0.05,
                "release": 0.8,
                "baseFrequency": 300,
                "octaves": 4
            }
        };
        this.synth = new Tone.MonoSynth(this.syhnthInfo).toMaster();
        
        this.chorus = new __WEBPACK_IMPORTED_MODULE_0__chorus_js__["a" /* default */](this.syhnthInfo);

        this.keyboard = Interface.Keyboard();

        this.keyboard.keyDown = (note) => {

            if (this.chorus.isPlaying()) return;
            if (!this.keynotes[note]) this.keynotes[note] = {down : 0.0, up : 0.0};

            this.keynotes[note].down = new Date() * 1.0;
            this.synth.triggerAttack(note);
        };
        this.keyboard.keyUp = (note) => {

            this.keynotes[note].up = new Date() * 1.0;
            this.synth.triggerRelease();
            
            this.chorus.push(note, this.keynotes[note].down, this.keynotes[note].up);
            this.chorus.autoPlay();
        };
    },

    update: function (t, dt) {

    },

    animate: function (oldt, nowt) {
        // this.update(nowt, (nowt - oldt) * 0.001);
        requestAnimationFrame(this.animate.bind(this, nowt));
    }
})();




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



class Chorus {
    constructor(info) {
        this.noteinfo = {};
        for(var octav = 0; octav <= 8; octav ++){
            this.noteinfo["C"  + octav] =  0 + 12 * (octav);
            this.noteinfo["C#" + octav] =  1 + 12 * (octav);
            this.noteinfo["D"  + octav] =  2 + 12 * (octav);
            this.noteinfo["D#" + octav] =  3 + 12 * (octav);
            this.noteinfo["E"  + octav] =  4 + 12 * (octav);
            this.noteinfo["F"  + octav] =  5 + 12 * (octav);
            this.noteinfo["F#" + octav] =  6 + 12 * (octav);
            this.noteinfo["G"  + octav] =  7 + 12 * (octav);
            this.noteinfo["G#" + octav] =  8 + 12 * (octav);
            this.noteinfo["A"  + octav] =  9 + 12 * (octav);
            this.noteinfo["A#" + octav] = 10 + 12 * (octav);
            this.noteinfo["B"  + octav] = 11 + 12 * (octav);
        }
        
        this.synth = [];
        this.synth.push(new Tone.MonoSynth(info).toMaster());

        //Bass
        this.synth.push(new Tone.MonoSynth(info).toMaster());
        
        //high
        this.synth.push(new Tone.MonoSynth(info).toMaster());

        this.synth.push(new Tone.MonoSynth(info).toMaster());
        this.synth.push(new Tone.MonoSynth(info).toMaster());

        this.bit = 100;

        this.isplaying = false;

        this.melodies = [];
        this.chor_list = [];
    }

    push(note, down, up) {
        
        if(this.melodies.length == 0) this.duration = down;
        this.melodies.push({name : note, idx : this.noteinfo[note], down : down, up : up});
        if(this.melodies.length == 4) this.duration = up - this.duration; 
    }



    bass_start() {
        var chor_idx = ((Math.random() * this.chor_list.length) << 0);
        this.synth[1].triggerAttack(this.chor_list[chor_idx] + "2");
    }
    bass_process() {
        this.bass_start();
        setTimeout(this.bass_end.bind(this), this.duration);
        // if(this.isplaying) setTimeout(this.bass_process.bind(this), 60000 / this.bit * 0.5 * 4);
    }
    bass_end() {
        this.synth[1].triggerRelease();
    }

    
    high_start() {
        var chor_idx = ((Math.random() * this.chor_list.length) << 0);
        this.synth[2].triggerAttack(this.chor_list[chor_idx] + "3");
    }
    high_process() {
        this.high_start();
        setTimeout(this.high_end.bind(this), this.duration);
        // if(this.isplaying) setTimeout(this.high_process.bind(this), 60000 / this.bit * 0.5 * 4);
    }
    high_end() {
        this.synth[2].triggerRelease();
    }
    

    melody_start() {
    }

    melody_process() {
        
        const curr_note = this.melodies[this.melody_idx];        
        const next_note = this.melodies[this.melody_idx + 1];                

        this.melody_idx += 1;

        this.synth[0].triggerAttack(curr_note.name);

        setTimeout(this.melody_end.bind(this), curr_note.up - curr_note.down);

        if(4 > this.melody_idx) {
            setTimeout(this.melody_process.bind(this), next_note.down - curr_note.up);
        }
        else {
            this.isplaying = false;
            this.melodies = [];
        }
    }
    melody_end() {
        this.synth[0].triggerRelease();
    }

    make_chorus_list() {
        for(var i = 0; i < this.melodies.length ; i += 2) {
            const note = this.melodies[i];
            var name = note.name;

            this.chor_list.push(name.slice(0, name.length - 1));
        }
    }

    play() {
        this.melody_idx = 0;
        this.isplaying = true;


        this.make_chorus_list();
        this.melody_process();
        this.bass_process();
        this.high_process();

    }

    autoPlay() {
        if(!this.isplaying && this.melodies.length >= 4) {
            this.play();
        }
    }

    isPlaying() { return this.isplaying; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Chorus;


/***/ })
/******/ ]);