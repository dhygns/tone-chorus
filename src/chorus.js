


export default class Chorus {
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