
import Chorus from "./chorus.js"

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
        
        this.chorus = new Chorus(this.syhnthInfo);

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


